'use strict';

(function () {
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var allFormEl = document.querySelectorAll('.form__element');
  var form = document.querySelector('.notice__form');
  var addressInput = document.querySelector('#address');

  roomCapacity[0].selected = 'false';
  roomCapacity[2].selected = 'true';

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(checkoutTime, checkinTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(apartmentType, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], ['1000', '0', '5000', '10000'], syncValueWithMin);
  window.synchronizeFields(roomNumber, roomCapacity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValues);

  window.form = {
    setActive: function (flag) {
      if (flag) {
        form.classList.remove('notice__form--disabled');
      }
      for (var i = 0; i < allFormEl.length; i++) {
        allFormEl[i].disabled = !flag;
      }
    },
    setDisabledAdress: function () {
      addressInput.disabled = false;
      // addressInput.readOnly = true;
    },
    setAdressValue: function (x, y) {
      addressInput.textContent = 'x: ' + x + ', y: ' + y;
    }
  };
  window.form.setActive(false);


  var successHandler = function () {
    form.reset();
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.cssText = 'z-index: 100; background-color: red; color: white; text-align: center;';
    node.style.fontSize = '24px';
    node.textContent = errorMessage;
    document.body.insertBefore(node, document.body.firstChild);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

})();

