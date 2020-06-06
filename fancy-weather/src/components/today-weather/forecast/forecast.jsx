import React, {useCallback, useContext, useEffect} from 'react';
import './forecast.scss'
import {WeatherContext} from '../../../contexts/weather-context';



const Forecast = () => {
  const [weatherContext] = useContext(WeatherContext);

  useEffect(() => {
    console.log("weather context =", weatherContext);
  }, [weatherContext]);

  const iconSrc = useCallback(() => {
    console.log('icon');
    return `https://openweathermap.org/img/wn/${weatherContext.forecast.current.weather[0].icon}@4x.png`;
  }, [weatherContext]);

  // const iconSrc = `https://openweathermap.org/img/wn/${appState.weather.weather[0].icon}@4x.png`;

  return (
      <div className="today-weather__forecast">
        <div className="forecast__degree">{Math.round(weatherContext.forecast.current.temp)}</div>
        <div className="forecast__weather">
          <img src={iconSrc()} alt="" className="weather__icon"/>
          <div className="weather__additional-info">
            <div className="weather__clouds">{weatherContext.forecast.current.weather[0].main}</div>
            <div className="weather__fells-like">FEELS LIKE: <span className="fells-like__val">{Math.round(weatherContext.forecast.current.feels_like)}</span>°</div>
            <div className="weather__wind">WIND: <span className="wind__val">{Math.round(weatherContext.forecast.current.wind_speed)}</span>M/S</div>
            <div className="weather__humidity">HUMIDITY: <span className="humidity__val">{Math.round(weatherContext.forecast.current.humidity)}</span>%</div>
          </div>
        </div>
      </div>
  )
};

export default Forecast;
