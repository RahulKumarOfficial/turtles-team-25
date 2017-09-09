/// get time and date



$(document).ready(function() {


  

function ampmTime(){
   
   var today = new Date();
   var h = today.getHours();
   var m = today.getMinutes();
   var s = today.getSeconds();
   m = checkTime(m);
   s = checkTime(s);
   if(h < 12){
         $('#clock').text(h + ":" + m + ":" + s + " AM");
         var t = setTimeout(ampmTime, 500);
     }
     else{
         h = h-12;
         $('#clock').text(h + ":" + m + ":" + s + " PM");
         var t = setTimeout(ampmTime, 500);
     }
   
 }
ampmTime();

 


//$('#clock24').hide();
$('#twentyhr').click(function startTime() {
   var today = new Date();
   var a = today.getHours();
   var b = today.getMinutes();
   var c = today.getSeconds();
   b = checkTime(b);
   c = checkTime(c);
   var twenty = $('#clock').text(a + ":" + b + ":" + c)
   var t = setInterval(startTime, 500);
}
);

$('#twelvehr').click(function() {
  ampmTime();
});

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}





var d = new Date();
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];

document.getElementById('day').innerHTML = n;

var month = d.getMonth();
var months = new Array();
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";
var month = months[d.getMonth()];

document.getElementById('month').innerHTML = month;

var date = d.getDate();

document.getElementById('date').innerHTML = date;


});

//Quote code////////////////////////////////////////////////////////////////////////////////////////////

var url = "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";
var getQuote = function(data) {
  $(".quote-text").text('" '+data.quoteText+' "');

 var quot = 'https://twitter.com/intent/tweet?text=' + '"'+ data.quoteText+ '"' + ' - ' + data.quoteAuthor;

  if (data.quoteAuthor === '') {
    data.quoteAuthor = 'Unknown';
  }
  $(".author-text").text('- ' + data.quoteAuthor);
  $(".twitter-share-button").attr("href", quot);
};


$(document).ready(function() {
  $.getJSON(url, getQuote, 'jsonp');
});




$("#refresh").click(function() {
  $.getJSON(url, getQuote, 'jsonp');
});


$(".twitter-share").on("click", function() {
		tweetCurrentPage();
  });
  



// Weather section/////////////////////////////////////////////////////////////////////////////////////////////

var lat;
var lon;
var api = "https://fcc-weather-api.glitch.me/api/current?";
$(document).ready(function(){
  //Check if navigator enabled
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
     var lat = "lat=" +position.coords.latitude;
     var lon = "lon=" + position.coords.longitude;

    getWeather(lat, lon);
  });
}
  else {
    console.log("Geolocation is not supported by this browser.");
  }
});


function getWeather(lat,lon){
  var urlstr = api +lat + "&" + lon;

  $.ajax({
    url: urlstr,
  success:function(result) {
 // Get city and country from API
 $(".city").text(result.name);
 $(".country").text(result.sys.country);
    // Get local temprature
    var round = result.main.temp;
    var temp = Math.round(round);




    $(".temprature").text(temp +" "+ String.fromCharCode(176));
    //Toggle Farenheit
    $("#farenheit").on("click",
 function toggleFaren(){
     var far = temp * 9/5 +32;
     $(".temprature").text(Math.round(far)+" "+String.fromCharCode(176));
      window['toggleFaren'] = toggleFaren;
 });
  //Toggle Celcius
$("#celcius").on("click", function toggleCelcius(){

    $(".temprature").text(temp+" "+String.fromCharCode(176));
  window['toggleCelcius'] = toggleCelcius;
  });



    //Get weather icons
    var icons = new Skycons({"color": "161616"});
    var desc= result.weather[0].main.toLowerCase();

    var d = result.weather[0].description.toLowerCase();
    //distinguish between day and night icons

    var iurl = result.weather[0].icon;



    // checks wether it's night or day by looking at the letter before .png (n or d) using RegEx match
    var match = /.png/.exec(iurl);
    if (match){
        var i = match.index;
        var s = iurl[i-1];

    }


    if(s == 'd' && desc == "clear"){
       desc = "clear sky-d";
       }
    else if(s == 'n' && desc == "clear"){
       desc = "clear sky-n";
    }
    else if(s == 'd' && d == "few clouds"){
      desc = "few clouds-d";
    }
    else if(s == 'd' && d == "few clouds"){
      desc = "few clouds-n";
    }

    //Switch icons according to weather
    var idesc = "";

    switch (desc){
      case "clear sky-d":
         idesc = "clear_day"
         break;
      case "clear sky-n":
         idesc = "clear_night"
         break;
      case "few clouds-d":
         idesc = "partly_cloudy_day"
         break;
      case "few clouds-n":
         idesc = "partly_cloudy_night"
         break;
      case "mist":
         idesc = "fog"
         break;
      case "rain":
        idesc = "rain"
        break;
      case "scattered clouds":
        idesc = "cloudy"
        break;
      case "thunderstorm":
        idesc = "wind";
        break;
      case "shower rain":
        idesc = "sleet"
        break;
      case "snow":
        idesc = "snow"
        break;
      case "rain":
        idesc = "rain"
        break;
      default:
        idesc = "cloudy"
        break;

                 }

var iname = idesc.toUpperCase();

var call = "Skycons." + iname;
var x = eval(call);
icons.set("icon", x);

icons.play();

  }


  });


};

//Settings Code//////////////////////////////////////////////////////////////////////////////////////

var images = [ 'backgrounds/light/cloudy-day.png', 'backgrounds/light/concrete-texture.png','backgrounds/light/congruent_pentagon.png','backgrounds/light/ep_naturalwhite.png','backgrounds/light/grey_@2X.png','backgrounds/light/topography.png','backgrounds/light/vertical-waves.png','backgrounds/dark/congruent_outline.png','backgrounds/dark/dark_embroidery.png','backgrounds/dark/dark-triangles.png','backgrounds/dark/footer_lodyas.png','backgrounds/dark/pink dust.png','backgrounds/dark/pink dust.png' ];


  $("#change-img").on('click',function(){
    var ind = Math.floor((Math.random() * (images.length)));
    var ind2=Math.floor((Math.random() * (images.length)));
    console.log(ind);
    if(ind!=ind2)
    $('body').css('background-image','url('+images[ind]+')');
    $('body').css('background-image','url('+images[ind+1]+')');

  });


$("#google-calendar").on('click', function() {
        window.open('https://calendar.google.com/calendar/');
    });

var fonts = [ 'amatic', 'dosis', 'inconsolata', 'lobster', 'monoton', 'open', 'orbitron', 'patrick', 'sacramento', 'source' ];
var prev_ind = 0, ind = 1;
var changeFont = function(i) {
    console.log(i);
    $("body").css("font-family", i);
};

var x = function() {
    do
  ind = Math.floor((Math.random() * (fonts.length)));
  while (ind == prev_ind);
  prev_ind = ind;
  changeFont(fonts[ind]);
}

