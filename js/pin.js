'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var mapPins = document.querySelector('.map__pins');
  var filterHousingType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuests = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');
  var filterInputFeatures = filterFeatures.querySelectorAll('input');
  var filterInputFeature = filterFeatures.querySelector('input');
  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');


  var successHandler = (function (authors) {
    window.data = authors;
    window.pinsArray = [];
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < 8; j++) {

      var butt = document.createElement('button');
      butt.className = 'map__pin hidden';
      butt.style.cssText = 'left:' + authors[j].location.x + 'px; top:  ' + authors[j].location.y + 'px';
      butt.style.tabIndex = '0';
      butt.id = j;

      fragment.appendChild(butt);

      var img = document.createElement('img');
      img.src = authors[j].author.avatar;
      img.width = 40;
      img.height = 40;
      img.draggable = false;
      butt.appendChild(img);
      window.pinsArray.push(butt);
    }
    mapPins.appendChild(fragment);


    window.setupMapPins = function () {
      var elMapPins = document.querySelectorAll('.map__pin');
      var popup = document.querySelector('.popup');

      var EscClickHandler = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          popup.classList.add('hidden');
        }
      };

      var handleSelection = function (elem) {
        window.showCard(window.data[+elem.id]);
        popup.classList.remove('hidden');
        for (var j = 1; j < elMapPins.length; j++) {
          if (elMapPins[j].classList.contains('map__pin--active')) {
            elMapPins[j].classList.remove('map__pin--active');
          }
        }
        elem.classList.add('map__pin--active');
        document.addEventListener('keydown', EscClickHandler);
      };

      var hideSelection = function () {
        popup.classList.add('hidden');
        document.removeEventListener('keydown', EscClickHandler);
      };

      var elPopupClose = popup.querySelector('.popup__close');
      elPopupClose.addEventListener('click', function () {
        hideSelection();
      });

      elPopupClose.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          hideSelection();
        }
      });

      for (var i = 1; i < elMapPins.length; i++) {
        elMapPins[i].addEventListener('click', function (evt) {
          handleSelection(this);
        });
      }

      for (var i = 1; i < elMapPins.length; i++) {
        elMapPins[i].addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            handleSelection(this);
          }
        });
      }
    };
    window.setupMapPins();
  });

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.cssText = 'z-index: 100; background-color: red; color: white; text-align: center;';
    node.style.fontSize = '24px';
    node.textContent = errorMessage;
    document.body.insertBefore(node, document.body.firstChild);
  };

  window.backend.load(successHandler, errorHandler);


  var applyFilters = function () {
    var toFilter = [];
    for (var i = 0; i < window.pinsArray.length; i++) {
      window.pinsArray[i].classList.add('hidden');
      var applyFilterPrice = function () {
        if (window.data[i].offer.price < 10000 && filters.price === 'low') {
          return true;
        } else if (window.data[i].offer.price >= 50000 && filters.price === 'high') {
          return true;
        } else if (window.data[i].offer.price >= 10000 &&
                   window.data[i].offer.price < 50000 &&
                   filters.price === 'middle') {
          return true;
        } else if (filters.price === 'any') {
          return true;
        } else {
          return false;
        }
      };
      var findFeatures = function (ind) {
        if (window.data[i].offer.features[ind] === filters.features[ind]) {
          return true;
        } else if (filters.features[ind] === false) {
          return true;
        } else {
          return false;
        }
      };

      toFilter[0] = (window.data[i].offer.type === filters.housingType || filters.housingType === 'any');
      toFilter[1] = applyFilterPrice();
      toFilter[2] = (window.data[i].offer.rooms === +filters.rooms || filters.rooms === 'any');
      toFilter[3] = (window.data[i].offer.guests === +filters.guests || filters.guests === 'any');
      toFilter[4] = findFeatures(0);
      toFilter[5] = findFeatures(1);
      toFilter[6] = findFeatures(2);
      toFilter[7] = findFeatures(3);
      toFilter[8] = findFeatures(4);
      toFilter[9] = findFeatures(5);

      var usePinsFilters = function () {
        for (var j = 0; j < toFilter.length; j++) {
          if (toFilter[j] === false) {
            window.pinsArray[i].classList.add('hidden');
            break;
          } else {
            window.pinsArray[i].classList.remove('hidden');
          }
        }
      };
      usePinsFilters();
    }
  };


  var filters = {
    housingType: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: [false, false, false, false, false, false],
  };
  filterHousingType.addEventListener('change', function () {
    filters.housingType = this.value;
    applyFilters();
  });
  filterPrice.addEventListener('change', function () {
    filters.price = this.value;
    applyFilters();
  });
  filterRooms.addEventListener('change', function () {
    filters.rooms = this.value;
    applyFilters();
  });
  filterGuests.addEventListener('change', function () {
    filters.guests = this.value;
    applyFilters();
  });


  var doFilterOnOff = function (filterName, ind) {
    if (filters.features[ind] !== false || filterName.checked === false) {
      filters.features[ind] = false;
      applyFilters();
    } else {
      filters.features[ind] = filterName.value;
      applyFilters();
    }
  };

  var prevTimer;

  filterWifi.addEventListener('change', function () {
    window.clearTimeout(prevTimer);
    prevTimer = window.setTimeout(function () {
      doFilterOnOff(filterWifi, 0);
    }, 500);
  });

  filterDishwasher.addEventListener('change', function () {
    window.clearTimeout(prevTimer);
    prevTimer = window.setTimeout(function () {
      doFilterOnOff(filterDishwasher, 1);
    }, 500);
  });

  filterParking.addEventListener('change', function () {
    window.clearTimeout(prevTimer);
    prevTimer = window.setTimeout(function () {
      doFilterOnOff(filterParking, 2);
    }, 500);
  });

  filterWasher.addEventListener('change', function () {
    window.clearTimeout(prevTimer);
    prevTimer = window.setTimeout(function () {
      doFilterOnOff(filterWasher, 3);
    }, 500);
  });

  filterElevator.addEventListener('change', function () {
    window.clearTimeout(prevTimer);
    prevTimer = window.setTimeout(function () {
      doFilterOnOff(filterElevator, 4);
    }, 500);
  });

  filterConditioner.addEventListener('change', function () {
    window.clearTimeout(prevTimer);
    prevTimer = window.setTimeout(function () {
      doFilterOnOff(filterConditioner, 5);
    }, 500);
  });

})();
