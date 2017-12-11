'use strict';

window.synchronizeFields = (function () {
  return function (value1, value2, arr1, arr2, callback) {
    value1.addEventListener('change', function () {
      if (typeof callback === 'function') {
        callback(value2, arr2[arr1.indexOf(value1.value)]);
      }
    });
  };
})();
