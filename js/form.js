'use strict';

(function () {
  var selectTimeIn = document.querySelector('#timein');
  var selectimeOut = document.querySelector('#timeout');
  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');

  roomCapacity[0].selected = 'false';
  roomCapacity[2].selected = 'true';

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields.sync(selectTimeIn, selectimeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields.sync(selectimeOut, selectTimeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields.sync(apartmentType, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], ['1000', '0', '5000', '10000'], syncValueWithMin);
  window.synchronizeFields.sync(roomNumber, roomCapacity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValues);
})();
