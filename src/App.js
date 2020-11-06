import logo from "./logo.svg";
import "./App.css";
import { API_KEY } from "./constants";
import React from "react";

/**
 * BASIC FEATURES
 * 1. Refresh every 5-10 minutes with the exact temp and weather conditions
 * 2. Should have responsive designs
 * 3. Choose and display location and date
 */

/**
 * ADVANCED FEATURES
 * 1. Users can click on a specific day to see the hourly forecast
 * 2. Add graphic library like 'vx'
 */

const GetWeatherForm = (props) => {
  const [city, setCity] = React.useState("seattle");

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="city-input"> City </label>
      <input
        id="city-input"
        onChange={(e) => setCity(e.target.value)}
        placeholder="Type your city name..."
      />
      <button onClick={() => props.getWeather(city)}>Get Weather</button>
    </form>
  );
};

function App() {
  const getWeather = (city) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`)
      .then((res) => {
        console.log(res.json());
      })
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Blue Sky</h1>
      </header>
      <GetWeatherForm getWeather={(city) => getWeather(city)} />
    </div>
  );
}

export default App;
