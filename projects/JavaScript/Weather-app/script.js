class WeatherApp {
  constructor() {
    this.apiKey = "aadaf9d26fc3e7afe78efbc886693cb3";
    this.apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    this.defaultCity = "Moscow";
    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.elements = {
      inputEnterCity: document.querySelector(".container-search input"),
      btnSearch: document.querySelector(".container-search button"),

      iconWeather: document.querySelector("#iconWeather"),
      degrees: document.querySelector("#degrees"),
      cityName: document.querySelector("#city-name"),

      infoWind: document.querySelector(".wind p"),
      infoHumidity: document.querySelector(".humidity p"),
    };
  }

  async getWeather(city = this.elements.inputEnterCity.value) {
    if (!city) {
      city = this.defaultCity;
      this.elements.inputEnterCity.value = city;
    }

    try {
      const response = await fetch(
        this.apiUrl + city + "&appid=" + this.apiKey,
      );

      if (!response.ok) {
        throw new Error("Город не найден");
      }

      const data = await response.json();
      this.displayWeather(data);
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  }

  displayWeather(data) {
    this.elements.degrees.innerHTML = Math.round(data.main.temp) + " &#8451;";
    this.elements.cityName.innerHTML = data.name;
    this.elements.infoHumidity.innerHTML = data.main.humidity + " %";
    this.elements.infoWind.innerHTML = Math.round(data.wind.speed) + " km/h";

    this.updateIconWeather(data.weather[0].main)
  }

  updateIconWeather(nameWeather){
    const weather = {
        'Clear': "fa-sun",
        'Clouds': "fa-cloud",
        'Rain': "fa-cloud-showers-heavy",
        'Thunderstorm': "fa-cloud-bolt",
        'Snow': "fa-snowflake",
        'Fog': "fa-smog",
        'Tornado': "fa-tornado",
    }
    
    if(!weather[nameWeather]){
        this.elements.iconWeather.className = "fa-solid " + weather['Clear']
    }
    
    this.elements.iconWeather.className = "fa-solid " + weather[nameWeather]
  }

  bindEvents() {
    this.elements.btnSearch.addEventListener("click", () => {
      this.getWeather();
    });
    this.elements.inputEnterCity.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.getWeather();
      }
    });
  }
}

const app = new WeatherApp();
