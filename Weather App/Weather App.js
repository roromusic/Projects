var city,
    country,
    temp,
    condition;

/*function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert("Sorry, no geolocation support");
  }
}*/

function getLocation() {
  var url = "https://ipinfo.io/json";
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var data = JSON.parse(request.responseText);
      city = data.city;
      country = data.country;
      document.getElementById("city").innerHTML = city + ", " + country;
      
      getWeather();
    }
  };
}

function getWeather() {
  var url = "http://api.openweathermap.org/data/2.5/weather" +
            "?q=" + city + "," + country +
            "&units=imperial" +
            "&appid=635fe3e9a98f52a266ec8dffa165c302";
  
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var data = JSON.parse(request.responseText);
      temp = Math.round(data.main.temp);
      condition = data.weather[0].main;
      var textNode = document.createTextNode(temp);
      var element = document.getElementById("temp");
      element.insertBefore(textNode, element.firstChild);
      document.getElementById("condition").innerHTML = condition;
      
      //Icon
      var id = data.weather[0].id;
      var thunder = /2\d{2}/;
      var rain = /[35]\d{2}/;
      var snow = /6\d{2}/;
      var clear = /800/;
      var clouds = /80\d{1}/;
      
      switch(true) {
          //thunderstorm
        case thunder.test(id):
          iconFunc("thunder-storm", "cloud", "lightning", "bolt");
          break;
          
          //rain
        case rain.test(id):
          iconFunc("rainy", "cloud", "rain");
          break;
          
          //snow
        case snow.test(id):
          iconFunc("flurries", "cloud", "snow", "flake");
          break;
          
          //sunny
        case clear.test(id):
          iconFunc("sunny", "sun", "rays");
          break;
          
          //cloudy
        case clouds.test(id):
          iconFunc("cloudy", "cloud", "cloud");
          break;
      }
      function iconFunc(class1, class2, class3, class4) {
        var div1, div2, div3, div4;
        
        div1 = document.createElement("div");
        div1.className = "icon " + class1;
        
        div2 = document.createElement("div");
        div2.className = class2;
        div1.appendChild(div2);
        
        div3 = document.createElement("div");
        div3.className = class3;
        if (class3 == "rays") {
          div2.appendChild(div3);
        }else {
          div1.appendChild(div3);
        }
        
        if(arguments.length == 4) {
          div4 = document.createElement("div");
          div4.className = class4;
          div3.appendChild(div4);
          div3.appendChild(div4.cloneNode(false));
        }
        document.body.appendChild(div1);
      }//iconFunc
    }//request.readyState
  };
}

getLocation();

document.getElementById("degree").onclick = function() {
degToggle()};

function degToggle() {
  var deg = document.getElementById("degree");
  var element = document.getElementById("temp");
  var c = document.createTextNode(Math.round((temp-32) * 5/9));
  var f = document.createTextNode(temp);
      
  if (deg.innerHTML == "F") {
    deg.innerHTML = "C";
    element.replaceChild(c, element.firstChild);
  }else {
    deg.innerHTML = "F";
    element.replaceChild(f, element.firstChild);
  }
}
