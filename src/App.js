import logo from "./logo.svg";
import "./App.css";
import { API_KEY } from "./constants";
import React from "react";
import WeatherCard from "./components/WeatherCard";

/**
 * BASIC FEATURES
 * 1. Refresh every 5-10 minutes with the exact temp and weather conditions
 * 2. Should have responsive designs
 * 3. Choose and display location and date
 * 4. Can switch between Farenheit and Celsius
 * 5. Can switch language
 */

/**
 * ADVANCED FEATURES
 * 1. Users can click on a specific day to see the hourly forecast
 * 2. Add graphic library like 'vx'
 */

const GetWeatherForm = (props) => {
  const [city, setCity] = React.useState(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.getWeather(city);
      }}
    >
      <label htmlFor="city-input"> City </label>
      <input
        required
        id="city-input"
        onChange={(e) => setCity(e.target.value)}
        placeholder="Type your city name..."
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

function App() {
  const [weatherData, setWeatherData] = React.useState(null);
  const [unit, setUnit] = React.useState('Celsius')

  const getWeather = (city) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const simplifiedData = {
          city: json.city.name,
          country: json.city.country,
          data: json.list.map((a, index) => {
            const newDate = new Date(a.dt_txt);
            return {
              ...a,
              index: index,
              date: newDate.toDateString(),
              time: newDate.toTimeString(),
            };
          }),
        };

        setWeatherData(simplifiedData);
      });
  };

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Blue Sky</h1>
        </header>
  <button id="unit-button" onClick={() => setUnit('Farenheit')}>{unit}</button>
        <GetWeatherForm getWeather={(city) => getWeather(city)} />
      </div>
      {weatherData ? <WeatherCard weather={weatherData} /> : null}
    </React.Fragment>
  );
}

export default App;
