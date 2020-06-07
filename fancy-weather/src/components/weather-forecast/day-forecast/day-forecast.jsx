import React from 'react';
import './day-forecast.scss'
import {getIconUrl} from '../../../helpers/utils';

const DayForecast = ({ day, temp, iconCode }) => {

  return (
    <div className="day-forecast">
      <div className="day-forecast__day">{day.toUpperCase()}</div>
      <div className="day-forecast__weather">
        <div className="day-forecast__temperature"><span>{temp}</span>°</div>
        <div className="day-forecast__icon"><img src={getIconUrl(iconCode)} alt="icon"/></div>
      </div>
    </div>
  )
};

export default DayForecast;
