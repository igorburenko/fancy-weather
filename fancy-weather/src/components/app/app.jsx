import React, {createContext, useState} from 'react';
import './app.scss'
import Controls from '../controls';
import '../../assets/background/bg1.jpg';
import {CurrentWeatherProvider} from '../../contexts/weather-context';
import {StateProvider} from '../../contexts/state-context';
import LoaderLogic from '../loader-logic';


export const cityContext = createContext([['odessa', 'Ukraine'], () => {}]);

// export const CurrentWeatherProvider = ({children}) => {
//   const [state, setState] = useState({});
//   return (
//     <WeatherContext.Provider value={[state, setState]}>
//       {children}
//     </WeatherContext.Provider>
//   )
// };


const App = () => {
  const [currCity, setCurrCity] = useState({});
  return (
    <StateProvider>
      <CurrentWeatherProvider>
        <cityContext.Provider value={[currCity, setCurrCity]}>
          <main className="wrapper">
            <div className="container">
              <Controls/>
              <LoaderLogic/>
            </div>
          </main>
        </cityContext.Provider>
      </CurrentWeatherProvider>
    </StateProvider>
  );
};

export default App;
