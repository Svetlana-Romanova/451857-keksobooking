'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPin = document.querySelectorAll('.map__pin');
  var popup = document.querySelector('.popup');
  var article = document.querySelector('article');
  var allFormEl = document.querySelectorAll('.form__element');

  for (var i = 0; i < allFormEl.length; i++) {
    allFormEl[i].disabled = true;
  }
  mainPin.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].classList.remove('hidden');
    }
    for (var i = 0; i < allFormEl.length; i++) {
      allFormEl[i].disabled = false;
    }
  });

  var EscClickHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      article.classList.add('hidden');
    }
  };

  var handleSelection = function (a) {
    window.card.showPopup(window.data[+a.id]);
    article.classList.remove('hidden');
    for (var j = 1; j < mapPin.length; j++) {
      if (mapPin[j].classList.contains('map__pin--active')) {
        mapPin[j].classList.remove('map__pin--active');
      }
    }
    a.classList.add('map__pin--active');
    document.addEventListener('keydown', EscClickHandler);
  };

  var hideSelection = function () {
    article.classList.add('hidden');
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

  for (var i = 1; i < mapPin.length; i++) {
    mapPin[i].addEventListener('click', function () {
      handleSelection(this);
    });
  }

  for (var i = 1; i < mapPin.length; i++) {
    mapPin[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        handleSelection(this);
      }
    });
  }
})();

