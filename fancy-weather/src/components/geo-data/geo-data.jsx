import React from 'react';
import './geo-data.scss'
import Coordinates from './coordinates';
import LocationMap from './location-map';

const GeoData = () => {
  return (
    <section className="geo-data">
      <LocationMap/>
      <Coordinates/>
    </section>
  )
};

export default GeoData;
