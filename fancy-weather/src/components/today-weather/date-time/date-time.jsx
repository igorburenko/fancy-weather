import React, { useState, useEffect, useCallback } from 'react';
import './date-time.scss'
import { WEEK_DAYS, MONTH } from '../../../constants/dates';

const transformTime = (value) => {
  // console.log('time transform');
  return value < 10 ? `0${value}` : value
};

const DateTime = () => {
  const [date, setDate] = useState(new Date());

  const weekDay = useCallback( () => WEEK_DAYS[date.getDay()], [date]);
  const day = useCallback( () => date.getDate(), [date]);
  const month = useCallback( () => MONTH[date.getMonth()], [date]);
  const hour = useCallback(() => transformTime(date.getHours()), [date]);
  const minutes = useCallback(() => transformTime(date.getMinutes()), [date]);


  useEffect(() => {
    const timeout = setInterval(() => setDate(new Date()), 30000);
    return () => clearInterval(timeout);
  }, [setDate]);


  return (
     <div className="today-weather__date">
        <span>{`${weekDay()} ${day()} ${month()}`}</span>
        <span className='today-weather__time'>{`${hour()}:${minutes()}`}</span>
      </div>
  )
};

export default DateTime;
