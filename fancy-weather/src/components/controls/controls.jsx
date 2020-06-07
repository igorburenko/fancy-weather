import React, {useContext, useEffect, useCallback, useState, useRef} from 'react';
import './controls.scss';
import {Autorenew, Mic} from '@material-ui/icons'
import {WeatherContext} from '../../contexts/weather-context';
import {StateContext} from '../../contexts/state-context';
import {getCity, getForecast, getUserLocation} from '../../helpers/api-helper';
import {UnitSwitch} from './unit-switch/unit-switch';
import {celsiusUnitsContext, cityContext} from '../app/app';
import {COUNTRIES} from '../../constants/country-codes';



const Controls = () => {
  const [weatherContext, setWeatherContext] = useContext(WeatherContext);
  const [, setSelectedCity] = useContext(cityContext);
  const [, setControlsContext] = useContext(StateContext);
  const [isCelsius, setIsCelsius] = useContext(celsiusUnitsContext);

  const [language, setLanguage] = useState('en');
  const [currentCity, setCurrentCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [dropDownCity, setDropdownCity] = useState([]);
  let reloadStyle = useRef({transform: 'rotate(0deg)'});

  const changeLoadingState = useCallback((loading) => {
    setControlsContext(state => ({
      ...state,
      isReload: loading,
    }));
  }, [setControlsContext]);

  const changeLang = useCallback((event) => {
      event.persist();
      console.log(event.target.value);
      setLanguage(event.target.value);
    }, [setLanguage]);

  const changeUnits = useCallback((event) => {
      event.persist();
      setIsCelsius(event.target.checked);
      localStorage.units = event.target.checked;
    }, [setIsCelsius]);

  const submitSearch = useCallback((event) => {
      event.persist();
      event.preventDefault();
      getCity(event.target[0].value).then(cities => setCityList(cities));
    }, []);

  const resetDropdownCity = useCallback((event) => {
    event.persist();
    setDropdownCity(null);
    setCurrentCity(cityList.features[event._targetInst.key]);
    setSelectedCity(cityList.features[event._targetInst.key].place_name.split(','))
  }, [cityList.features, setSelectedCity]);

  const reload = useCallback(() => {
    setCurrentCity( {...currentCity});
    reloadStyle.current = {transform: 'rotate(360deg)'};
  }, [currentCity, setCurrentCity]);

  useEffect(() => {
    getUserLocation().then(location => {
      const coords = location.loc.split(',');
      setSelectedCity([location.city, '', COUNTRIES[location.country]]);
      setCurrentCity({
        center: [coords[1], coords[0]],
      })
    })
  }, []);

  useEffect(() => {
      if (Object.keys(currentCity).length !== 0) {
        getForecast(currentCity.center[1], currentCity.center[0]).then((forecast) => setWeatherContext({forecast}));
      }
    }, [currentCity, setWeatherContext]
  );

  useEffect(() => {
    if (Object.keys(cityList).length !== 0) {
      setDropdownCity(
        <div className='city-dropdown'>
          {cityList.features.map((point, idx) => {
            const city = point.place_name.length > 37 ? `${point.place_name.slice(0, 36)}...` : point.place_name;
            return <option onClick={resetDropdownCity}
                    key={idx}>{city}</option>
          })}
        </div>)
    }
  }, [cityList, resetDropdownCity]);

  useEffect(() => {
    if (Object.keys(weatherContext).length !== 0) {
      changeLoadingState(false);
    }
  }, [weatherContext, changeLoadingState]);

  return (
    <section className="controls">
      <div className="controls__left-side">
        <button className="controls__reload" onClick={reload}>
          <Autorenew style={reloadStyle.current} className="reload__icon"/>
        </button>
        <select className="controls__language" value={language} onChange={changeLang}>
          <option value="en">EN</option>
          <option value="ru">RU</option>
          <option value="bu">BU</option>
        </select>
        <UnitSwitch
          changeUnits={changeUnits}
          checked={isCelsius}
        />
      </div>
      <form onSubmit={submitSearch} className="controls__right-side">
        <input type="text"
               className="search__input"
               placeholder="Search city or ZIP"/>
        <Mic className="mic__icon"/>
        <button className="search__submit">SEARCH</button>
        {dropDownCity}
      </form>
    </section>
  )
};

export default Controls;
