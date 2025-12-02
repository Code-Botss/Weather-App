const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "01a8470df89209cdacb714f0f14d21df";
const searchBox = document.getElementById("myInput")
const searchBtn = document.getElementById("searchBtn")
const myImage = document.querySelector(".weather_icon")
const loading = document.querySelector(".loading");

// To save last city info in local storage
function savelastcity (city){
    localStorage.setItem("lastcity",city)
};

// To get last city name as default value
function loadlastcity(){
    const lastcity = localStorage.getItem("lastcity")
    if (lastcity) {
        checkWeather(lastcity)
    }
}

async function checkWeather(city) {
    // Show loading spinner
    loading.style.diplay = "block"
    document.querySelector(".weather").style.display = "none"
    document.querySelector(".error").style.display = "none"


    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    else {
        let data = await response.json();

        savelastcity(city);
        // console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // To Update the image according to weather condition code :
        if (data.weather[0].main == "Clouds") {
            myImage.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            myImage.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            myImage.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            myImage.src = "images/mist.png"
        }
        else if (data.weather[0].main == "Snow") {
            myImage.src = "images/snow.png"
        }
        else if (data.weather[0].main == "Rain") {
            myImage.src = "images/rain.png"
        }
        loading.style.display = "none"
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }

}

//Search Button Click
searchBtn.addEventListener("click", () => {
    if(searchBox.value != ""){ 
        checkWeather(searchBox.value);
    }
})

//Search via Enter Key
searchBox.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        checkWeather(searchBox.value);
    }
})


// Load last searched city on page load
window.onload = loadlastcity;