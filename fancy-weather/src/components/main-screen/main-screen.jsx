import React from 'react';
import './main-screen.scss'
import TodayWeather from '../today-weather';
import WeatherForecast from '../weather-forecast';
import GeoData from '../geo-data';



const MainScreen = () => {
  return (
    <div className="main-screen__wrapper">
      <div className="main-screen__forecast">
        <TodayWeather/>
        <WeatherForecast/>
      </div>
      <GeoData/>
    </div>
  )
};

export default MainScreen;
