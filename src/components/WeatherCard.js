import humidityIcon from "../icons/humidity.svg";
import thermometerIcon from "../icons/thermometer.svg";

/**
 * 1. Display the icon of the weather (rain, sunny, cloudy, lightnings, snowy, etc.) CHECK
 * 2. Display the temperature (Celsius, Farenheit) --> Both high and low temp of each day
 * 3. Display the humidity
 * 4. (Extension) background gif for the weather condition
 *
 */

import React from "react";
import Spacer from "./Spacer";

const WeatherCards = (props) => {
  const { unit, weather } = props;

  /** Group API response data by date */
  function groupBy(array, property) {
    return array.reduce((acc, x) => {
      if (!acc[x[property]]) {
        acc[x[property]] = [];
      }
      acc[x[property]].push(x);
      return acc;
    }, {});
  }

  // Group weather data response by date
  let groupedData = groupBy(weather.data, "date");

  // Sort the data by date
  const datesAsArray = Object.keys(groupedData).reduce((acc, cur) => {
    /**
     * Todo: normalize the data such that we always have data for each hour.
     */
    acc.push({ dateString: cur, data: groupedData[cur] });
    return acc;
  }, []);

  const sortedDates = [...datesAsArray].sort(
    (a, b) =>
      new Date(a.dateString).valueOf() - new Date(b.dateString).valueOf()
  );

  console.log(sortedDates);

  const OneDayWeatherCard = (props) => {
    const dateString = props.weatherData;
    const data = props.weatherData.data;

    return (
      <div className="weather-card">
        <h4 className="WeatherCard__DateHeader"> {dateString.dateString} </h4>
        <Spacer height={10} />
        <div className="weather-by-time-container">
          {data.map((a) => {
            return (
              <div className="weather-by-time">
                <div>
                  <a>{getTime(a.time)}</a>
                </div>
                <div id="icon">
                  <img
                    id="weather-icon"
                    src={getIcon(a.weather[0].icon)}
                    alt="Weather icon"
                  />
                </div>
                <div className="icons-data">
                  <img
                    id="humidity-icon"
                    src={humidityIcon}
                    alt="Weather icon"
                  />
                  <a>{a.main.humidity}%</a>
                </div>
                <div className="icons-data">
                  <img
                    id="humidity-icon"
                    src={thermometerIcon}
                    alt="Weather icon"
                  />
                  <a>{convertKelvinToCelsius(a.main.temp)}</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="weather-week-container">
      {sortedDates.map((a) => {
        return <OneDayWeatherCard weatherData={a} />;
      })}
    </div>
  );
};

/** Find the url for the weather icon depends on the weather description */
function getIcon(icon) {
  const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return url;
}

function convertKelvinToCelsius(temperature) {
  const cTemperature = temperature - 273;
  const temp = Math.round(cTemperature);
  const formalTemp = temp + "°C";
  return formalTemp;
}

function convertKelvinToFarenheit(temperature) {
  const fTemperature = ((temperature - 273.15) * 9) / 5 + 32;
  const temp = Math.round(fTemperature);
  const formalTemp = temp + "°F";
  return formalTemp;
}

// Get only the first part of the timeString in the response API
function getTime(string) {
  const stringArray = string.split(" ");
  const timeStamp = stringArray[0].split(":");
  const time = timeStamp[0] + ":" + timeStamp[1];
  return time;
}

export default WeatherCards;
