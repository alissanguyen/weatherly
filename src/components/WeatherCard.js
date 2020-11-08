/**
 * 1. Display the icon of the weather (rain, sunny, cloudy, lightnings, snowy, etc.)
 * 2. Display the temperature (Celsius, Farenheit) --> Both high and low temp of each day
 * 3. Display the humidity and wind speed
 * 4. (Extension) background gif for the weather condition
 *
 */

import React from "react";

const WeatherCard = (props) => {
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

  function convertKelvinToCelsius(temperature) {
      const cTemperature = temperature - 273;
  }

  function convertKelvinToFarenheit(temperature) {
      const fTemperature = (( (temperature - 273.15) * 9 ) / 5 ) + 32
  }

  let sortedData = groupBy(data.data, "date");
  console.log(sortedData);

  /**
   * (for i=0; i < sortedData.size(); i++) { return ()}
   * 
   * 
   * 
   * sortedData[i].date //date
   * sortedData[i].time //time
   * sortedData[i].main.humidity
   * sortedData[i].main.temp
   * sortedData[i].main.temp_max
   * sortedData[i].main.temp_min
   * sortedData[i].weather[0].description
   * 
   * 
   */
  
  return (
    <React.Fragment>
      <div className="weather-card">
        <h4>{data.city}</h4>
      </div>
    </React.Fragment>
  );
};

export default WeatherCard;
