import React, {useContext} from 'react';
import './coordinates.scss'
import {WeatherContext} from '../../../contexts/weather-context';

const Coordinates = () => {
  const [weatherContext] = useContext(WeatherContext);

  const lat = `${weatherContext.forecast.lat}`.split('.');
  const lon = `${weatherContext.forecast.lon}`.split('.');

  return (
    <div className="coordinates">
      <div className="coordinates__latitude">
        Latitude: {lat[0]}°{lat[1]}'
      </div>
      <div className="coordinates__longitude">
        Longitude: {lon[0]}°{lon[1]}'
      </div>
    </div>
  )
};

export default Coordinates;
