import logo from "./logo.svg";
import "./App.css";
import "./WeatherData.css";
import { API_KEY, UnitOfTemperature } from "./constants";
import React from "react";
import WeatherCards from "./components/WeatherCard";
import DropDownButton from "./components/DropDownButton";

/**
 * BASIC FEATURES
 * 1. Display five-day weather data
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
  const [unit, setUnit] = React.useState(UnitOfTemperature.CELSIUS);
  const [show, setShow] = React.useState(false);

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App__NameDisplay">Blue Sky</h1>
      </header>
      <div className="App__FixedWidthContainer">
        <DropDownButton onClick={() => setShow((show) => !show)} />
        {show && (
          <div id="components-box">
            <div className="unit">
              <button onClick={() => setUnit(UnitOfTemperature.CELSIUS)}>
                Celsius (°C)
              </button>
            </div>
            <div>
              <button onClick={() => setUnit(UnitOfTemperature.FAHRENHEIT)}>
                Farenheit (°F)
              </button>
            </div>
          </div>
        )}
        <GetWeatherForm getWeather={(city) => getWeather(city)} />
        {weatherData ? (
          <React.Fragment>
            <h2 className="WeatherData__LocationDisplay">
              {weatherData.city}, {weatherData.country}
            </h2>
            <WeatherCards
              className="weather-cards"
              unit={unit}
              weather={weatherData}
            />
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
}

export default App;
