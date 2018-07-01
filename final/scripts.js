var animation = document.getElementById("flexwrappermain");

animation.addEventListener("animationend", removeEnterAnimation, false);

getLocation();

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

        document.getElementById("temp").innerHTML = "Temperature: " + weatherInfo.main.temp

        document.getElementById("high").innerHTML = "High: " +weatherInfo.main.temp_max;


        document.getElementById("low").innerHTML = "Low: " +weatherInfo.main.temp_min;


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

        //day one

        document.getElementById("onedesc").innerHTML = capitalizeFirstLetter(forecastInfo.list["0"].weather["0"].description);

        document.getElementById("onetemp").innerHTML = "Temp: " + forecastInfo.list["0"].main.temp;

        document.getElementById("onehigh").innerHTML = "H: " +forecastInfo.list["0"].main.temp_max;


        document.getElementById("onelow").innerHTML = "L: " +forecastInfo.list["0"].main.temp_min;


        document.getElementById("oneicon").src = "icons/" + forecastInfo.list["0"].weather["0"].icon + ".png";

        //day two

        document.getElementById("twodesc").innerHTML = capitalizeFirstLetter(forecastInfo.list["1"].weather["0"].description);

        document.getElementById("twotemp").innerHTML = "Temp: " + forecastInfo.list["6"].main.temp;

        document.getElementById("twohigh").innerHTML = "H: " +forecastInfo.list["6"].main.temp_max;


        document.getElementById("twolow").innerHTML = "L: " +forecastInfo.list["6"].main.temp_min;


        document.getElementById("twoicon").src = "icons/" + forecastInfo.list["6"].weather["0"].icon + ".png";

        //day three

        document.getElementById("threedesc").innerHTML = capitalizeFirstLetter(forecastInfo.list["2"].weather["0"].description);

        document.getElementById("threetemp").innerHTML = "Temp: " + forecastInfo.list["13"].main.temp;

        document.getElementById("threehigh").innerHTML = "H: " +forecastInfo.list["13"].main.temp_max;


        document.getElementById("threelow").innerHTML = "L: " +forecastInfo.list["13"].main.temp_min;


        document.getElementById("threeicon").src = "icons/" + forecastInfo.list["13"].weather["0"].icon + ".png";

        //day four

        document.getElementById("fourdesc").innerHTML = capitalizeFirstLetter(forecastInfo.list["3"].weather["0"].description);

        document.getElementById("fourtemp").innerHTML = "Temp: " + forecastInfo.list["20"].main.temp;

        document.getElementById("fourhigh").innerHTML = "H: " +forecastInfo.list["20"].main.temp_max;


        document.getElementById("fourlow").innerHTML = "L: " +forecastInfo.list["20"].main.temp_min;


        document.getElementById("fouricon").src = "icons/" + forecastInfo.list["20"].weather["0"].icon + ".png";

        //day five

        document.getElementById("fivedesc").innerHTML = capitalizeFirstLetter(forecastInfo.list["4"].weather["0"].description);

        document.getElementById("fivetemp").innerHTML = "Temp: " + forecastInfo.list["27"].main.temp;

        document.getElementById("fivehigh").innerHTML = "H: " +forecastInfo.list["27"].main.temp_max;


        document.getElementById("fivelow").innerHTML = "L: " +forecastInfo.list["27"].main.temp_min;


        document.getElementById("fiveicon").src = "icons/" + forecastInfo.list["27"].weather["0"].icon + ".png";


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