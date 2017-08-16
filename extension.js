/// get time and date

//$(document).ready(function() {
 
$('#clock12').hide();

function ampmTime(){
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
   
  if(h < 12){
        $('#clock12').text(h + ":" + m + " AM");
        var t = setTimeout(ampmTime, 500);
    }
    else{
        h = h-12;
        $('#clock12').text(h + ":" + m  + " PM");
        var t = setTimeout(ampmTime, 500);
    }
  
}
ampmTime();
//$('#clock12').hide();
function startTime() {
  
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    
    var twenty = $('#clock24').text(h + ":" + m );
    var b = setInterval(startTime, 500);
}
startTime();


$('#toggle-time').click(function(){
  $("#clock24,#clock12").toggle();
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


//});
///

//Quote code

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

///


// Weather section

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
    
$(".temprature").text(temp );

$(".degree").text(String.fromCharCode(176))
    
$(".unit").text("C");
    
$(".unit").on("click", function() {
  window.change = function (){
	var x = $('.unit').text();
	if (x.indexOf('C') == -1) {
		var a = $('.temprature').text();
		$('.temprature').text(Math.round((a - 32) * 500  / 9) / 100);
		$(".unit").text('C');
	} else {
		var b = $('.temprature').text() * 9 / 5 + 32;
		$('.temprature').text(Math.round(b * 100) / 100);
		$(".unit").text('F');
	}
   
  }
change();
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



