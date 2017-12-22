'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var mapPins = document.querySelector('.map__pins');
  var filterHousingType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterGuests = document.querySelector('#housing-guests');
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
    for (var i = 0; i < 8; i++) {

      var btn = document.createElement('button');
      btn.className = 'map__pin hidden';
      btn.style.cssText = 'left:' + authors[i].location.x + 'px; top:  ' + authors[i].location.y + 'px';
      btn.style.tabIndex = '0';
      btn.id = i;

      fragment.appendChild(btn);

      var img = document.createElement('img');
      img.src = authors[i].author.avatar;
      img.width = 40;
      img.height = 40;
      img.draggable = false;
      btn.appendChild(img);
      window.pinsArray.push(btn);
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

      for (var k = 1; k < elMapPins.length; k++) {
        elMapPins[k].addEventListener('click', function (evt) {
          handleSelection(evt.currentTarget);
        });
      }

      for (var l = 1; l < elMapPins.length; l++) {
        elMapPins[l].addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            handleSelection(evt.currentTarget);
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

  var prevTimer;

  var applyFilters = function () {
    window.clearTimeout(prevTimer);
    prevTimer = window.setTimeout(function () {
      var toFilter = [];
      for (var i = 0; i < window.pinsArray.length; i++) {
        window.pinsArray[i].classList.add('hidden');
        var applyFilterPrice = function () {
          if (
            (window.data[i].offer.price < 10000 && filters.price === 'low') ||
            (window.data[i].offer.price >= 50000 && filters.price === 'high') ||
            (window.data[i].offer.price >= 10000 && window.data[i].offer.price < 50000 && filters.price === 'middle') ||
            (filters.price === 'any')
          ) {
            return true;
          } else {
            return false;
          }
        };
        var findFeatures = function (ind) {
          if (
            (window.data[i].offer.features[ind] === filters.features[ind]) ||
            (filters.features[ind] === false)
          ) {
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

      var pinsCount = 0;
      if (window.pinsArray.length > 1) {
        for (var j = 0; j < window.pinsArray.length; j++) {
          if (!window.pinsArray[j].classList.contains('hidden')) {
            if (pinsCount >= 5) {
              window.pinsArray[j].classList.add('hidden');
            }
            pinsCount++;
          }
        }
      }

    }, 500);
  };


  var filters = {
    housingType: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: [false, false, false, false, false, false],
  };

  filterHousingType.addEventListener('change', function () {
    filters.housingType = filterHousingType.value;
    applyFilters();
  });
  filterPrice.addEventListener('change', function () {
    filters.price = filterPrice.value;
    applyFilters();
  });
  filterRooms.addEventListener('change', function () {
    filters.rooms = filterRooms.value;
    applyFilters();
  });
  filterGuests.addEventListener('change', function () {
    filters.guests = filterGuests.value;
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


  filterWifi.addEventListener('change', function () {
    doFilterOnOff(filterWifi, 0);
  });

  filterDishwasher.addEventListener('change', function () {
    doFilterOnOff(filterDishwasher, 1);
  });

  filterParking.addEventListener('change', function () {
    doFilterOnOff(filterParking, 2);
  });

  filterWasher.addEventListener('change', function () {
    doFilterOnOff(filterWasher, 3);
  });

  filterElevator.addEventListener('change', function () {
    doFilterOnOff(filterElevator, 4);
  });

  filterConditioner.addEventListener('change', function () {
    doFilterOnOff(filterConditioner, 5);
  });

})();
