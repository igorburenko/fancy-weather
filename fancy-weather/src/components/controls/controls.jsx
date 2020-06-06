import React, {useContext, useEffect, useCallback, useState} from 'react';
import './controls.scss';
import {Autorenew, Mic} from '@material-ui/icons'
import {WeatherContext} from '../../contexts/weather-context';
import {StateContext} from '../../contexts/state-context';
import {getWeather, getCity, getForecast} from '../../helpers/api-helper';
import {UnitSwitch} from './unit-switch/unit-switch';
import {cityContext} from '../app/app';


const loadCityWeather = (isCelsius, city = 'odessa') => {
  return getWeather(city, isCelsius);
};

const loadForecast = (isCelsius = true, lat, lon) => {
  return getForecast(lat, lon, true);
};

const Controls = () => {
  const [weatherContext, setWeatherContext] = useContext(WeatherContext);
  const [selectedCity, setSelectedCity] = useContext(cityContext);
  const [controlsContext, setControlsContext] = useContext(StateContext);
  const [language, setLanguage] = useState('en');
  const [isCelsius, setIsCelsius] = useState(true);
  const [currentCity, setCurrentCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [dropDownCity, setDropdownCity] = useState([]);

  const changeLang = useCallback((event) => {
      event.persist();
      console.log(event.target.value);
      setLanguage(event.target.value);
    }, [setLanguage]
  );

  const changeUnits = useCallback((event) => {
      event.persist();
      console.log(event.target.checked);
      setIsCelsius(event.target.checked);
    }, [setIsCelsius]
  );

  const submitSearch = useCallback((event) => {
      event.persist();
      event.preventDefault();
      getCity(event.target[0].value).then(cities => setCityList(cities));
      // setCurrentCity(event.target[0].value);
    }, []
  );

  const resetDropdownCity = useCallback((event) => {
    event.persist();
    setDropdownCity(null);
    // console.log(cityList.features[event._targetInst.key].place_name.split(','));
    setCurrentCity(cityList.features[event._targetInst.key]);
    setSelectedCity(cityList.features[event._targetInst.key].place_name.split(','))
  }, [cityList.features, setSelectedCity]);

  useEffect(() => {
      if (Object.keys(currentCity).length !== 0) {
        loadForecast(isCelsius, currentCity.center[1], currentCity.center[0]).then((forecast) => setWeatherContext({forecast}));
      }
    }, [isCelsius, currentCity, setWeatherContext]
  );

  useEffect(() => {
    if (Object.keys(cityList).length !== 0) {
      setDropdownCity(
        <div className='city-dropdown'>
          {cityList.features.map((point, idx) => <option onClick={resetDropdownCity}
                                                         key={idx}>{point.place_name}</option>)}
        </div>)
    }
  }, [cityList, resetDropdownCity]);

  // const changeWeatherState = useCallback((stateObj) => {
  //   console.log('Weather changed in changeWeatherState');
  //   setWeatherContext(() => ({
  //     ...stateObj
  //   }));
  // }, [setWeatherContext]);

  const changeLoadingState = useCallback((loading) => {
    console.log('Global changed in controls changeLoadingState');
    setControlsContext(state => ({
      ...state,
      isReload: loading,
    }));
  }, [setControlsContext]);

  useEffect(() => {
    if (Object.keys(weatherContext).length !== 0) {
      changeLoadingState(false);
    }
  }, [weatherContext, changeLoadingState]);


  return (
    <section className="controls">
      <div className="controls__left-side">
        <button className="controls__reload"
          // onClick={reload}
        >
          <Autorenew className="reload__icon"/>
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
