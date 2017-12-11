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
  var addressInput = document.querySelector('#address');

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
    addressInput.removeAttribute('disabled');
    addressInput.readOnly = true;
  });

  var EscClickHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      article.classList.add('hidden');
    }
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
      window.showCard.handleSelection(this);
      document.addEventListener('keydown', EscClickHandler);
    });
  }

  for (var i = 1; i < mapPin.length; i++) {
    mapPin[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.showCard.handleSelection(this);
        document.addEventListener('keydown', EscClickHandler);

      }
    });
  }


  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinY = mainPin.offsetTop - shift.y;
      if (mainPinY > 580) {
        mainPinY = 580;
      } else if (mainPinY < 180) {
        mainPinY = 180;
      }

      mainPin.style.top = mainPinY + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      addressInput.value = 'x: ' + mainPin.style.left + ', y: ' + mainPin.style.top;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

