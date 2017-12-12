'use strict';

(function () {
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
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

  window.synchronizeFields(checkinTime, checkoutTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(checkoutTime, checkinTime, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(apartmentType, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], ['1000', '0', '5000', '10000'], syncValueWithMin);
  window.synchronizeFields(roomNumber, roomCapacity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValues);
})();
