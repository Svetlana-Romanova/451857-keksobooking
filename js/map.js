'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var buildings = ['flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var randomElement = function (arr) {
  var randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

var randomNumber = function (min, max) {
  max += 1;
  return Math.floor(Math.random() * (max - min) + min);
};

var randomPop = function (array) {
  var removed = array.splice(randomElement(array), 1);
  return removed;
};

var randomArray = function (array) {
  var arr = array.slice();
  var len = randomNumber(1, arr.length);
  var result = [];
  for (var i = 0; i < len; i++) {
    var el = randomElement(arr);
    result.push(el);
    arr.splice(arr.indexOf(el), 1);
  }
  return result;
};

var getAdds = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': randomPop(titles),
        'address': '',
        'price': randomNumber(1000, 1000000),
        'type': randomElement(buildings),
        'rooms': randomNumber(1, 5),
        'guests': randomNumber(2, 10),
        'checkin': randomElement(times),
        'checkout': randomElement(times),
        'features': randomArray(features),
        'description': '',
        'photos': []
      },

      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(100, 500)
      }
    };
    ad.offer.address = ad.location.x + ',' + ad.location.y;
    ads.push(ad);
  }
  return ads;
}
var realAds = getAdds();

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var j = 0; j < realAds.length; j++) {

  var butt = document.createElement('button');
  butt.className = 'map__pin';
  butt.style.cssText = 'left:' + realAds[j].location.x + 'px; top:  ' + realAds[j].location.y + 'px';
  butt.style.tabIndex = "0";
  butt.id = j;
  fragment.appendChild(butt);

  var img = document.createElement('img');
  img.src = realAds[j].author.avatar;
  img.width = 40;
  img.height = 40;
  img.draggable = false;
  butt.appendChild(img);
}
mapPins.appendChild(fragment);

var mapTemplate = document.querySelector('template').content;
var mapTemplateCopy = mapTemplate.cloneNode(true);

var showPopup = function(pinData) {

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
  };

  for (var i = 0; i < popupFeatures.children.length; i++) {
    popupFeatures.children[i].style.display = 'none';
    for (var j = 0; j < realAds[j].offer.features.length; j++) {
      var classElement = 'feature--' + realAds[j].offer.features[j];
      if (popupFeatures.children[i].classList.contains(classElement)) {
        popupFeatures.children[i].style.display = 'inline-block';
      }
    }
  }
  document.querySelector('.map').appendChild(mapTemplateCopy);
};

var map = document.querySelector('.map');
var fieldset = document.body.getElementsByTagName('fieldset');
var form = document.querySelector('.notice__form');
var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mouseup', function() {
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
});

var mapPin = document.querySelectorAll('.map__pin');
var popupClose = document.querySelector('.popup__close');

for(var i = 1; i < mapPin.length - 1; i++) {
  mapPin[i].addEventListener('click', function() {
    showPopup(realAds[+this.id]);
    var popup = document.querySelector('.popup');
    popup.style.display = 'block';
    for(var j = 0; j < mapPin.length; j++) {
      if (mapPin[j].classList.contains('map__pin--active')) {
        mapPin[j].classList.remove('map__pin--active');
      }
    }
    this.classList.add('map__pin--active');
    popup.querySelector('.popup__close').addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'none';
    })
  })
};

