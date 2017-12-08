'use strict';

window.pin = (function () {

  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.data.length; j++) {

    var butt = document.createElement('button');
    butt.className = 'map__pin hidden';
    butt.style.cssText = 'left:' + window.data[j].location.x + 'px; top:  ' + window.data[j].location.y + 'px';
    butt.style.tabIndex = '0';
    butt.id = j;

    fragment.appendChild(butt);

    var img = document.createElement('img');
    img.src = window.data[j].author.avatar;
    img.width = 40;
    img.height = 40;
    img.draggable = false;
    butt.appendChild(img);
  }
  mapPins.appendChild(fragment);
  return mapPins;
})();
