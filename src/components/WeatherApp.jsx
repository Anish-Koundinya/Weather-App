import "./WeatherApp.css";
import searchImage from "../assets/search.png";
import clearImage from "../assets/clear.png";
import cloudImage from "../assets/cloud.png";
import drizzleImage from "../assets/drizzle.png";
import humidityImage from "../assets/humidity.png";
import rainImage from "../assets/rain.png";
import snowImage from "../assets/snow.png";
import windImage from "../assets/wind.png";
import { useState } from "react";

const WeatherApp = () => {
  let api_key = "7c4056720f58268ac7aa03f411422716";
  const [wicon, setWicon] = useState(cloudImage);

  const search = async () => {
    const input = document.getElementsByClassName("cityInput");

    if (input[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind");
    const temp = document.getElementsByClassName("temp");
    const location = document.getElementsByClassName("location");

    humidity[0].textContent = data.main.humidity + "%";
    wind[0].textContent = Math.floor(data.wind.speed) + "km/h";
    temp[0].textContent = Math.floor(data.main.temp) + "°C";
    location[0].textContent = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clearImage);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloudImage);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzleImage);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzleImage);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rainImage);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rainImage);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snowImage);
    } else {
      setWicon(clearImage);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div className="search-icon">
          <img src={searchImage} alt="search" onClick={search} />
        </div>
      </div>
      <div className="weather-img">
        <img src={wicon} alt="cloud" />
      </div>
      <div className="temp">24°C</div>
      <div className="location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityImage} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windImage} alt="" className="icon" />
          <div className="data">
            <div className="wind">15 km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
