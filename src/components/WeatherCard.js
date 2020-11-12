import cloudyIcon from "../icons/cloudy.svg";
import windyIcon from "../icons/windy.svg";
import sunnyIcon from "../icons/sun.svg";
import rainyIcon from "../icons/rainy.svg";
import snowyIcon from "../icons/snowy.svg";
import humidityIcon from "../icons/humidity.svg";
import thermometerIcon from "../icons/thermometer.svg";

/**
 * 1. Display the icon of the weather (rain, sunny, cloudy, lightnings, snowy, etc.)
 * 2. Display the temperature (Celsius, Farenheit) --> Both high and low temp of each day
 * 3. Display the humidity and wind speed
 * 4. (Extension) background gif for the weather condition
 *
 */

import React from "react";

const WeatherCards = (props) => {
  const unit = props.unit;
  const data = props.weather;

  function groupBy(array, property) {
    return array.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  function handleIcons(weatherDescription) {
    if (weatherDescription.includes("rainy")) {
      var icon = rainyIcon;
    } else if (weatherDescription.includes("windy")) {
      var icon = windyIcon;
    } else if (
      weatherDescription.includes("sunny") ||
      weatherDescription.includes("clear")
    ) {
      var icon = sunnyIcon;
    } else if (weatherDescription.includes("cloud")) {
      var icon = cloudyIcon;
    } else if (weatherDescription.includes("snow")) {
      var icon = snowyIcon;
    }
  }

  function convertKelvinToCelsius(temperature) {
    const cTemperature = temperature - 273;
  }

  function convertKelvinToFarenheit(temperature) {
    const fTemperature = ((temperature - 273.15) * 9) / 5 + 32;
  }

  // Group weather data response by date
  let groupedData = groupBy(data.data, "date");

  // Sort the data by date
  const datesAsArray = Object.keys(groupedData).reduce((acc, cur) => {
    acc.push({ dateString: cur, data: groupedData[cur] });
    return acc;
  }, []);

  datesAsArray.sort(
    (a, b) =>
      new Date(a.dateString).valueOf() - new Date(b.dateString).valueOf()
  );

  console.log(datesAsArray);

  const OneDayWeatherCard = (props) => {
    const dateString = props.weatherData;
    const data = props.weatherData.data;
    return (
      <React.Fragment>
        <a> {dateString.dateString} </a>
        {data.map((a) => {
          return (
            <React.Fragment>
              <div className="weather-card">
                <div>
                  <a>{a.time}</a>
                </div>
                <div>
                  <a>{a.weather[0].description}</a>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div>
        {datesAsArray.map((a) => {
          return <OneDayWeatherCard weatherData={a} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default WeatherCards;
