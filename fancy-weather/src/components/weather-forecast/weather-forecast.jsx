import React, {useCallback, useContext, useEffect, useState} from 'react';
import './weather-forecast.scss'
import DayForecast from './day-forecast'
import {WeatherContext} from '../../contexts/weather-context';
import {getForecast, getWeather} from '../../helpers/api-helper';
import { WEEK_DAYS } from '../../constants/dates';

const millisInSecond = 1000;
const WeatherForecast = () => {
  const [weatherContext] = useContext(WeatherContext);
  const [forecastElem, setForecastElem] = useState([]);

  useEffect(() => {
    if (Object.keys(weatherContext.forecast.daily).length !== 0) {
      setForecastElem(
        <section className="weather-forecast">
          {weatherContext.forecast.daily.slice(1, 4).map((dayForecast, idx) => {
            return <DayForecast day={WEEK_DAYS[new Date(dayForecast.dt * millisInSecond).getDay()]}
                         key={idx}
                         temp={Math.round(dayForecast.temp.day)}
                         iconCode={dayForecast.weather[0].icon}/>
          }
                         )}
        </section>)
    }
  }, [weatherContext.forecast.daily, setForecastElem]);


  return (
    <React.Fragment>
      {forecastElem}
    </React.Fragment>

  )
};

export default WeatherForecast;
