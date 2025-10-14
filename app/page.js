'use client'

import { useState } from 'react'
import '../src/App.css'
import '../src/WeatherData.css'
import { UnitOfTemperature } from '../src/constants'
import WeatherCards from '../src/components/WeatherCard'
import DropDownButton from '../src/components/DropDownButton'
import FailureRetrievingData from '../src/components/FailureRetrievingData'
import logo from '../src/logo.svg'

const GetWeatherForm = (props) => {
  const [city, setCity] = useState(null)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        props.getWeather(city)
      }}
    >
      <label htmlFor="city-input"> City </label>
      <input
        required
        id="city-input"
        onChange={(e) => setCity(e.target.value)}
        placeholder="Type your city name..."
      />
      <button id="request-button" type="submit">Get Weather</button>
    </form>
  )
}

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [unit, setUnit] = useState(UnitOfTemperature.CELSIUS)
  const [show, setShow] = useState(false)
  const [failureRetrievingData, setFailureRetrievingData] = useState(false)

  const getWeather = (city) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    )
      .then((res) => {
        setFailureRetrievingData(false)
        return res.json()
      })
      .then((json) => {
        const simplifiedData = {
          city: json.city.name,
          country: json.city.country,
          data: json.list.map((a, index) => {
            const newDate = new Date(a.dt_txt)
            return {
              ...a,
              index: index,
              date: newDate.toDateString(),
              time: newDate.toTimeString(),
            }
          }),
        }
        setWeatherData(simplifiedData)
      })
      .catch(error => {
        console.log(error)
        setFailureRetrievingData(true)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo.src} className="App-logo" alt="logo" />
        <h1 className="App__NameDisplay">Weatherly</h1>
      </header>
      <div className="App__FixedWidthContainer">
        <DropDownButton onClick={() => setShow((show) => !show)} />
        {show && (
          <div id="components-box">
            <div>
              <button className="unit-button" onClick={() => setUnit(UnitOfTemperature.CELSIUS)}>
                Celsius (°C)
              </button>
            </div>
            <div>
              <button className="unit-button" onClick={() => setUnit(UnitOfTemperature.FAHRENHEIT)}>
                Farenheit (°F)
              </button>
            </div>
          </div>
        )}
        <GetWeatherForm getWeather={(city) => getWeather(city)} />
        {failureRetrievingData ? (<FailureRetrievingData/>) : null}
        {!failureRetrievingData && weatherData ? (
          <>
            <h2 className="WeatherData__LocationDisplay">
              {weatherData.city}, {weatherData.country}
            </h2>
            <WeatherCards
              className="weather-cards"
              unit={unit}
              weather={weatherData}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}
