ar NO_GEO_EX = -1;

$(document).ready(function() {
  init();
});

function init() {
  setUpForms();
  loadGeo();
}

var setUpForms = function() {
  $("form#custominput").submit(function(ev) {
    ev.preventDefault();
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"" + $("#locInput").val() + "\")&format=json&callback=?").done(geoLoaded);
  });
};

var loadBackground = function(type) {
  var img = new Image();
  var imgs = {
    "sunny": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Desert_on_the_Cabeza_Prieta_national_wildlife_refuge.jpg",
    "snowy": "http://www.public-domain-photos.com/free-stock-photos-3/landscapes/mountains/snowy-mountain.jpg",
    "rainy": "https://static.pexels.com/photos/1553/glass-rainy-car-rain.jpg",
    "cloudy": "http://res.freestockphotos.biz/pictures/2/2469-thick-white-clouds-in-a-blue-sky-above-mountains-pv.jpg",
    "default": "https://unsplash.it/1680/900/?random"
  };
  if (type!==undefined&&!imgs.hasOwnProperty(type)) {
    return false;
  }
  img.src = imgs[type];
  img.onload = function() {
    $("div.background").each(function() {
      $(this).css("background-image", "url(" + img.src + ")").fadeTo(500,1);
    });
  };
  return true;
};

var weatherCodes = function(i){
    if(i<5||(i>=8&&i<13)||(i>=37&&i<41)||i==35||i==45||i==47){
      return "rainy";
    }else if((i>=5&&i<8)||(i>=13&&i<19)||(i>=41&&i<44)||i==46){
      return "snowy";
    }else if((i>=19&&i<23)||(i>=26&&i<31)){
      return "cloudy";
    }else if(i>=31&&i<37&&i!=35){
      return "sunny";
    }else{
      return "default";
    }
};
