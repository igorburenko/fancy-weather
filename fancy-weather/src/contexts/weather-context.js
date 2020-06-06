import React, {createContext, useState} from 'react';


export const WeatherContext = createContext([{}, () => {}]);

export const CurrentWeatherProvider = ({children}) => {
  const [state, setState] = useState({});
  return (
    <WeatherContext.Provider value={[state, setState]}>
      {children}
    </WeatherContext.Provider>
  )
};
