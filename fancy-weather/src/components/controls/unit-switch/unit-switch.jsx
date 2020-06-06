import React from 'react';


export const UnitSwitch = ({changeUnits, checked}) => {
  return (
    <React.Fragment>
      <label className="switch controls__degree-switcher">
        <input type="checkbox" name="celsius" onChange={changeUnits} checked={checked}/>
        <span className="slider">
            <div>
              <p>°F</p><p>°C</p>
            </div>
          </span>
      </label>
    </React.Fragment>
  )
};

