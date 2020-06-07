import React, {createContext, useEffect, useState, useRef} from 'react';
import './app.scss'
import Controls from '../controls';
import '../../assets/background/bg1.jpg';
import {CurrentWeatherProvider} from '../../contexts/weather-context';
import {StateProvider} from '../../contexts/state-context';
import LoaderLogic from '../loader-logic';
import {getBackgroundImage} from '../../helpers/api-helper';



export const cityContext = createContext([{}, () => {}]);
export const celsiusUnitsContext = createContext([{}, () => {}]);


const App = () => {
  const wrapperEl = useRef();
  const [currCity, setCurrCity] = useState({});
  const [isCelsius, setIsCelsius] = useState(
    localStorage.units === 'true');
  const [bgData, setBgData] = useState({});

  useEffect( () => {
    getBackgroundImage().then(backgroundData => setBgData(backgroundData));
  }, [currCity, setBgData]);

  useEffect(() => {
    let url = bgData.urls ? bgData.urls.regular : '../../assets/background/bg3.jpg';
    wrapperEl.current.style.backgroundImage = `linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url("${url}")`
  }, [bgData.urls]);



  return (
    <StateProvider>
      <CurrentWeatherProvider>
        <cityContext.Provider value={[currCity, setCurrCity]}>
          <celsiusUnitsContext.Provider value={[isCelsius, setIsCelsius]}>
            <main className="wrapper"
                  ref={wrapperEl}
            >
              <div className="container">
                <Controls/>
                <LoaderLogic/>
              </div>
            </main>
          </celsiusUnitsContext.Provider>
        </cityContext.Provider>
      </CurrentWeatherProvider>
    </StateProvider>
);
};

export default App;
