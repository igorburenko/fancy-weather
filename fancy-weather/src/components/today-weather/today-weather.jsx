import React, {useContext} from 'react';
import './today-weather.scss'
import DateTime from './date-time';
import Forecast from './forecast';
import {cityContext} from '../app/app';


const TodayWeather = () => {
  const [selectedCity] = useContext(cityContext);

  return (
    <section className="today-weather">
      <div className="today-weather__location">
        {selectedCity[0].toUpperCase()}, {selectedCity[2].toUpperCase()}
      </div>
      <DateTime />
      <Forecast />
    </section>
  )
};

export default TodayWeather;
