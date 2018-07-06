var animation = document.getElementById("flexwrappermain");

animation.addEventListener("animationend", removeEnterAnimation, false);

if(localStorage.locationArray)
{
    var locations = JSON.parse(localStorage.locationArray);
}
else
{
    var locations = new Array();

    /*for(var i = 0; i < 100; i++)
    {
        locations[i] = "-1";
    }*/
    localStorage.locationArray = JSON.stringify(locations);
}

if((localStorage.lon || localStorage.lat))
{
    loadingScreenActivate();
    buildCachedLocationURLS();
}

else
{
    getLocation();
}

var weatherURL;
var forecastURL;

function loadWeatherAndForecast(weatherURL, forecastURL)
{
    loadWeather(weatherURL);
    loadForecast(forecastURL);
}

function loadWeather(weatherURL){

    var weatherObject = new XMLHttpRequest;

    weatherObject.open("GET", weatherURL, true);

    weatherObject.send();

    weatherObject.onload = function()
    {
        var weatherInfo = JSON.parse(weatherObject.responseText);

        console.log(weatherInfo);

        document.getElementById("locationname").innerHTML = weatherInfo.name;

        document.getElementById("description").innerHTML = capitalizeFirstLetter(weatherInfo.weather[0].description);

        document.getElementById("temp").innerHTML = weatherInfo.main.temp.toFixed(2) + "&#176;F"

        document.getElementById("highlow").innerHTML = weatherInfo.main.temp_max.toFixed(2) + "&#176;F / " + weatherInfo.main.temp_min.toFixed(2) + "&#176;F";

        document.getElementById("icon").src = "icons/" + weatherInfo.weather[0].icon + ".png";

    }

}

//forecast
function loadForecast(forecastURL){
    var forecastObject = new XMLHttpRequest;

    forecastObject.open("GET", forecastURL, true);

    forecastObject.send();

    forecastObject.onload = function()
    {

        var forecastInfo = JSON.parse(forecastObject.responseText);   
        console.log(forecastInfo);

        for(var i = 1; i < 6; i++){

            //document.getElementById("desc" + i).innerHTML = capitalizeFirstLetter(forecastInfo.list[i - 1].weather["0"].description);

            //document.getElementById("temp" + i).innerHTML = forecastInfo.list[i - 1].main.temp + "&#176;F";

            var increment = (((i - 1) * 8) + 6);

            document.getElementById("high" + i).innerHTML = forecastInfo.list[increment].main.temp_max.toFixed(2);


            document.getElementById("low" + i).innerHTML = " / " + forecastInfo.list[increment].main.temp_min.toFixed(2);


            document.getElementById("icon" + i).src = "icons/" + forecastInfo.list[increment].weather["0"].icon + ".png";
        }

        loadingScreenDeactivate();
        triggerEnterAnimation();
    }
}


function getLocation() {
    loadingScreenActivate();
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(buildLocationURLS, showError);
    } 

    else 
    { 
        x.innerHTML = "Geolocation is not supported by this browser.";

        loadingScreenDeactivate(0);
    }
}

function buildLocationURLS(position) {

    var lon = position.coords.longitude;
    var lat = position.coords.latitude;

    localStorage.lon = lon;
    localStorage.lat = lat;
    localStorage.time = new Date().getTime() / 1000;

    weatherURL = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=0e08266a16752f6b3e85f662e36178a6"

    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=0e08266a16752f6b3e85f662e36178a6"

    loadWeatherAndForecast(weatherURL, forecastURL);
}

function buildCachedLocationURLS() {

    var lon = localStorage.lon;
    var lat = localStorage.lat;

    weatherURL = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=0e08266a16752f6b3e85f662e36178a6"

    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=0e08266a16752f6b3e85f662e36178a6"

    loadWeatherAndForecast(weatherURL, forecastURL);
}

function showError(){

    document.getElementById("description").innerHTML = "Permission not granted for location based weather. <br> Add a location manually.";

    loadingScreenDeactivate();

    document.getElementById("icon").style.display = "none"; 

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadingScreenActivate()
{
    document.getElementById("flexwrappermain").style.filter = "blur(20px)";
    document.getElementById("loading").style.display = "block"; 
}

function loadingScreenDeactivate()
{
    document.getElementById("flexwrappermain").style.filter = "blur(0px)"; 
    document.getElementById("loading").style.display = "none"; 
}

function triggerEnterAnimation()
{
    document.getElementById("flexwrappermain").classList.add("bounceIn")
}

function removeEnterAnimation()
{
    document.getElementById("flexwrappermain").classList.remove("bounceIn")
}

function updateLocation()
{
    getLocation();
}

function addLocation()
{
    var locationBox = document.getElementById("locationBox");

    if(locationBox.value != "")
    {
        locations.push(locationBox.value);
    }

    console.log(locations.length);

    locationBox.value = "";

    localStorage.locationArray = JSON.stringify(locations);



}