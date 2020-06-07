import React, {useContext} from 'react';
import './forecast.scss'
import {WeatherContext} from '../../../contexts/weather-context';
import {celsiusUnitsContext} from '../../app/app';
import {checkTempUnits, getIconUrl} from '../../../helpers/utils';

const Forecast = () => {
  const [weatherContext] = useContext(WeatherContext);
  const [isCelsius] = useContext(celsiusUnitsContext);

  return (
      <div className="today-weather__forecast">
        <div className="forecast__degree">{Math.round(checkTempUnits(weatherContext.forecast.current.temp, isCelsius))}</div>
        <div className="forecast__weather">
          <img src={getIconUrl(weatherContext.forecast.current.weather[0].icon)} alt="" className="weather__icon"/>
          <div className="weather__additional-info">
            <div className="weather__clouds">{weatherContext.forecast.current.weather[0].main}</div>
            <div className="weather__fells-like">FEELS LIKE: <span className="fells-like__val">
                {Math.round(checkTempUnits(weatherContext.forecast.current.feels_like, isCelsius))}
              </span>
              °</div>
            <div className="weather__wind">WIND: <span className="wind__val">{Math.round(weatherContext.forecast.current.wind_speed)}</span>M/S</div>
            <div className="weather__humidity">HUMIDITY: <span className="humidity__val">{Math.round(weatherContext.forecast.current.humidity)}</span>%</div>
          </div>
        </div>
      </div>
  )
};

export default Forecast;
