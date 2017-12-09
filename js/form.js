'use strict';

(function () {
  var selectTimeIn = document.querySelector('#timein');
  var selectimeOut = document.querySelector('#timeout');
  var selectType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var addressInput = document.querySelector('#address');
  var roomCapacity = document.querySelector('#capacity');

  addressInput.removeAttribute('disabled');
  addressInput.readOnly = true;
  roomCapacity[0].removeAttribute('selected');
  roomCapacity[2].selected = true;

  var selectTmeChangeHandler = function (a, b) {
    a.addEventListener('change', function () {
      for (var i = 0; i < a.options.length; i++) {
        var option = a.options[i];
        if (option.selected) {
          b.options[i].selected = true;
        }
      }
    });
  };
  selectTmeChangeHandler (selectTimeIn, selectimeOut);
  selectTmeChangeHandler (selectimeOut, selectTimeIn);

  inputPrice.min = '1000';
  selectType.addEventListener('change', function (evt) {
    if (this.value === 'flat') {
      inputPrice.min = '1000';
    } else if (this.value === 'house') {
      inputPrice.min = '5000';
    } else if (this.value === 'palace') {
      inputPrice.min = '10000';
    } else {
      inputPrice.min = '0';
    }
  });

  roomNumber.addEventListener('change', function (evt) {
    for (var i = 0; i < roomNumber.options.length; i++) {
      if (this.value === '100') {
        roomCapacity.value = '0';
      } else {
        roomCapacity.value = this.value;
      }
    }
  });
})();
