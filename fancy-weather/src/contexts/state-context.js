import React, {createContext, useState} from 'react';


export const StateContext = createContext([{}, () => {}]);

export const StateProvider = ({children}) => {
  const [state, setState] = useState({
    celsius: false,
    isReload: true,
  });
  return (
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  )
};
