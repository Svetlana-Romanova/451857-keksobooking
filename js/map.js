'use strict';

(function () {

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mouseup', function () {
    var elMapPins = document.querySelectorAll('.map__pin');
    for (var j = 0; j < elMapPins.length; j++) {
      elMapPins[j].classList.remove('hidden');
    }
    if (elMapPins.length > 1) {
      window.form.setActive(true);
      window.form.setDisabledAdress();
      map.classList.remove('map--faded');
    }
  });

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
      window.form.setAdressValue(mainPin.style.left, mainPin.style.top);
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

