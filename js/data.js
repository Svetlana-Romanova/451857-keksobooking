
'use strict';

window.data = (function () {
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
  };
  var realAds = getAdds();
  return realAds;
})();
