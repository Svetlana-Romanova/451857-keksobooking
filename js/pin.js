'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  var successHandler = (function (authors) {
    window.data = authors;
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
    }
    mapPins.appendChild(fragment);


    window.setupMapPins = function () {
      var elMapPins = document.querySelectorAll('.map__pin');
      var popup = document.querySelector('.popup');
      var elPopupClose = popup.querySelector('.popup__close');

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


})();
