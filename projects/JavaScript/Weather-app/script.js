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
      body: document.querySelector("body"),

      inputEnterCity: document.querySelector(".container-search input"),
      btnSearch: document.querySelector(".container-search button"),

      containerInfo: document.querySelector(".information"),
      iconWeather: document.querySelector("#iconWeather"),
      degrees: document.querySelector("#degrees"),
      cityName: document.querySelector("#city-name"),

      infoWind: document.querySelector(".wind p"),
      infoHumidity: document.querySelector(".humidity p"),

      errorCityNotFound: document.querySelector(".notCity"),
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
      const data = await response.json();

      if (!response.ok || data.code == "404") {
        this.showError();
        return;
      }

      this.displayWeather(data);
      this.hideError();

      console.log(data);
    } catch (error) {
      alert(error.message);
    }

    this.elements.inputEnterCity.value = "";
  }

  showError() {
    this.elements.errorCityNotFound.style.display = "block";
    this.elements.containerInfo.style.display = "none";
    this.elements.body.style.backgroundImage = "none";
    this.elements.body.classList.remove("background-image");
  }

  hideError() {
    this.elements.errorCityNotFound.style.display = "none";
    this.elements.containerInfo.style.display = "block";
  }

  displayWeather(data) {
    this.elements.degrees.innerHTML = Math.round(data.main.temp) + " &#8451;";
    this.elements.cityName.innerHTML = data.name;
    this.elements.infoHumidity.innerHTML = data.main.humidity + " %";
    this.elements.infoWind.innerHTML = Math.round(data.wind.speed) + " km/h";

    this.updateIconWeather(data.weather[0].main);
  }

  updateIconWeather(nameWeather) {
    const weather = {
      Clear: "fa-sun",
      Clouds: "fa-cloud",
      Rain: "fa-cloud-showers-heavy",
      Thunderstorm: "fa-cloud-bolt",
      Snow: "fa-snowflake",
      Fog: "fa-smog",
      Tornado: "fa-tornado",
    };

    this.elements.body.className = "background-image";

    if (!weather[nameWeather]) {
      this.elements.iconWeather.className = "fa-solid " + weather["Clouds"];
      this.elements.body.style.backgroundImage = `url(img/Clouds.jpg)`;
    } else {
      this.elements.iconWeather.className = "fa-solid " + weather[nameWeather];
      this.elements.body.style.backgroundImage = `url(img/${nameWeather}.jpg)`;
    }
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
