import React from "react";
import errorSvg from "./404.svg";

const FailureRetrievingData = () => {
  return (
    <div className="failure-container">
      <img className="failure-svg" src={errorSvg} alt=""></img>
      <p className="failure-message">Sorry there was an error while retrieving our data. </p>
      <p className="failure-message">Please try again and make sure the city name is correctly spelled :)</p>
      <p className="failure-message">Example: Seattle</p>
    </div>
  );
};

export default FailureRetrievingData;
