'use strict';

(function () {

  var mapPin = document.querySelectorAll('.map__pin');
  var article = document.querySelector('article');

  window.showCard = {
    handleSelection: function (elem) {
      window.card.showPopup(window.data[+elem.id]);
      article.classList.remove('hidden');
      for (var j = 1; j < mapPin.length; j++) {
        if (mapPin[j].classList.contains('map__pin--active')) {
          mapPin[j].classList.remove('map__pin--active');
        }
      }
      elem.classList.add('map__pin--active');
    }
  };
})();
