var animation = document.getElementById("flexwrappermain");

animation.addEventListener("animationend", removeEnterAnimation, false);

var length = 0;

var weatherURL;
var forecastURL;

if(localStorage.locationArray)
{
    var locations = JSON.parse(localStorage.locationArray);
    updateLocationSelector();
}
else
{
    var locations = new Array();

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

function bootSavedLocations()
{
    if(localStorage.locationArray)
    {
        var locations = JSON.parse(localStorage.locationArray);
        updateLocationSelector();
    }
    else
    {
        var locations = new Array();

        localStorage.locationArray = JSON.stringify(locations);
    }
}

function bootLocation()
{
    if((localStorage.lon || localStorage.lat))
    {
        loadingScreenActivate();
        buildCachedLocationURLS();
    }

    else
    {
        getLocation();
    }
}

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

            var increment = ((i - 1) * 8);

            if(i == 1)
            {
                increment += 8;
            }

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

        loadingScreenDeactivate();
    }
}

function buildLocationURLS(position) {

    var lon = position.coords.longitude;
    var lat = position.coords.latitude;

    localStorage.lon = lon;
    localStorage.lat = lat;

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

function buildSavedURLS(name)
{
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=imperial&APPID=0e08266a16752f6b3e85f662e36178a6";
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&units=imperial&APPID=0e08266a16752f6b3e85f662e36178a6";

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

    document.getElementById("loading").style.opacity = "1"; 

    document.getElementById("loading").style.display = "block"; 
}

function loadingScreenDeactivate()
{
    document.getElementById("flexwrappermain").style.filter = "blur(0px)"; 

    document.getElementById("loading").style.opacity = "0"; 

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

function addLocation(name)
{
    var locationBox = document.getElementById("locationBox");
    var selector = document.getElementById("locationSelector");

    locations.push(name);
    updateLocationSelector();
    localStorage.locationArray = JSON.stringify(locations);
    locations.value = "";
    clearSearchViewer();

    document.getElementById('locationSelector').value = name;
    var selector = document.getElementById("locationBox").value = "";

    buildSavedURLS(name);

}

function changeLocation()
{
    var selector = document.getElementById("locationSelector");

    if(selector.value == "Current Location")
    {
        bootLocation();
    }
    else
    {
        buildSavedURLS(selector.options[selector.selectedIndex].value);
    }
}

function updateLocationSelector()
{
    clearLocationSelector();
    createLocationSelector();
}

function createLocationSelector()
{
    var selector = document.getElementById("locationSelector");

    for(var i = 0; i < locations.length; i++)
    {
        var option = document.createElement("option");
        option.text = locations[i];
        selector.add(option);
    }
}

function clearLocationSelector()
{
    var selector = document.getElementById("locationSelector");

    for(var i = selector.options.length - 1 ; i >= 1 ; i--)
    {
        selector.remove(i);
    }
}

function searchLocation()
{ 
    clearSearchViewer();

    var list = "https://api.openweathermap.org/data/2.5/find?q=" + document.getElementById("locationBox").value + "&type=like&units=imperial&APPID=0e08266a16752f6b3e85f662e36178a6";

    var searchObject = new XMLHttpRequest;
    var searchInfo;


    searchObject.open("GET", list, true);

    searchObject.send();

    searchObject.onload = function()
    {
        searchInfo = JSON.parse(searchObject.responseText);

        console.log(searchInfo);

        if(searchInfo.list.length == 0)
        {
            document.getElementById("searchViewer").innerHTML = "Location not available";
        }
        else
        {
            setTimeout(function(){
                for(var i = 0; i < searchInfo.list.length; i++)
                {
                    var holder = document.getElementById("searchViewer");
                    var button = document.createElement("BUTTON");
                    button.setAttribute("onclick", "addLocation(" + "\"" + searchInfo.list[i].name + ", " + searchInfo.list[i].sys.country + "\"" + ")");
                    button.setAttribute("class", "locationoptions");
                    button.innerHTML = searchInfo.list[i].name + ", " + searchInfo.list[i].sys.country;
                    holder.appendChild(button);
                }
                 window.scrollTo(0,document.body.scrollHeight);
            }, 1000);
        }
    }
}

function removeCurrentLocation()
{
    var selector = document.getElementById("locationSelector").value;

    for(var i = 0; i < locations.length; i++)
    {
        if(locations[i] == selector)
        {
            locations.splice(i, 1);
        }
    }
    localStorage.locationArray = JSON.stringify(locations);

    updateLocationSelector();

    bootLocation();
}

function clearSearchViewer()
{
    var myNode = document.getElementById("searchViewer");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}
