'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapTemplate = document.querySelector('template').content.querySelector('article');
  var mapTemplateCopy = mapTemplate.cloneNode(true);
  map.appendChild(mapTemplateCopy);

  window.showCard = function (pinData) {
    var typeBuilding = mapTemplateCopy.querySelector('h4');
    var popupFeatures = mapTemplateCopy.querySelector('.popup__features');
    var popupP = mapTemplateCopy.querySelectorAll('p');

    mapTemplateCopy.querySelector('h3').textContent = pinData.offer.title;
    mapTemplateCopy.querySelector('p').textContent = pinData.offer.address;
    mapTemplateCopy.querySelector('.popup__price').textContent = pinData.offer.price + '₽/ночь';
    popupP[2].textContent = 'Комнаты: ' + pinData.offer.rooms + ' для ' + pinData.offer.guests + ' гостей';
    popupP[3].textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
    popupP[4].textContent = pinData.offer.description;
    mapTemplateCopy.querySelector('.popup__avatar').src = pinData.author.avatar;

    if (pinData.offer.type === 'flat') {
      typeBuilding.textContent = 'Квартира';
    } else if (pinData.offer.type === 'bungalo') {
      typeBuilding.textContent = 'Бунгало';
    } else {
      typeBuilding.textContent = 'Дом';
    }

    for (var i = 0; i < popupFeatures.children.length; i++) {
      popupFeatures.children[i].style.display = 'none';
      for (var j = 0; j < pinData.offer.features.length; j++) {
        var classElement = 'feature--' + pinData.offer.features[j];
        if (popupFeatures.children[i].classList.contains(classElement)) {
          popupFeatures.children[i].style.display = 'inline-block';
        }
      }
    }
    return mapTemplateCopy;
  };
})();
