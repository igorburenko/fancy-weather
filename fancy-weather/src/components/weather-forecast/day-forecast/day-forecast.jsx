import React from 'react';
import './day-forecast.scss'

const DayForecast = ({ day, temp, iconCode }) => {

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  console.log(day, temp, iconCode);

  return (
    <div className="day-forecast">
      <div className="day-forecast__day">{day.toUpperCase()}</div>
      <div className="day-forecast__weather">
        <div className="day-forecast__temperature"><span>{temp}</span>°</div>
        <div className="day-forecast__icon"><img src={iconUrl} alt="icon"/></div>
      </div>
    </div>
  )
};

export default DayForecast;
