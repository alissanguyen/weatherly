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

const WeatherCards = (props) => {
  const unit = props.unit; //TODO: implement different unit systems
  const data = props.weather;

  /** Group APi response data by date */
  function groupBy(array, property) {
    return array.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
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

  /** Find the url for the weather icon depends on the weather description */
  function getIcon(icon) {
    const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return url;
  }

  function convertKelvinToCelsius(temperature) {
    const cTemperature = temperature - 273;
    const temp = Math.round(cTemperature);
    const formalTemp = temp + "°C"
    return formalTemp;
  }

  function convertKelvinToFarenheit(temperature) {
    const fTemperature = ((temperature - 273.15) * 9) / 5 + 32;
    const temp = Math.round(fTemperature);
    const formalTemp = temp + "°F"
    return formalTemp;
  }

  // Get only the first part of the timeString in the response API
  function getTime(string) {
    const stringArray = string.split(" ");
    const timeStamp = stringArray[0].split(":");
    const time = timeStamp[0] + ":" + timeStamp[1];
    return time;
  }

  function extendWeatherDescription() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    alert("hi");
  }

  const OneDayWeatherCard = (props) => {
    const dateString = props.weatherData;
    const data = props.weatherData.data;
    return (
      <React.Fragment>
        <a> {dateString.dateString} </a>
        <div className="weather-card">
          {data.map((a) => {
            return (
              <React.Fragment>
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
                  <div class="popup" onclick={() => extendWeatherDescription()}>
                    Click me!
                    <span class="popuptext" id="myPopup">
                      {a.weather[0].description}
                    </span>
                  </div>
                  <div>
                    <a>{a.main.humidity}</a>
                    <img
                      id="humidity-icon"
                      src={humidityIcon}
                      alt="Weather icon"
                    />
                  </div>
                  <div>
                  <img
                      id="humidity-icon"
                      src={thermometerIcon}
                      alt="Weather icon"
                    />
                    <a>{convertKelvinToCelsius(a.main.temp)}</a>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
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
