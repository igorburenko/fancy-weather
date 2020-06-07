import React, { useState, useEffect } from 'react';
import './date-time.scss'
import { WEEK_DAYS, MONTH } from '../../../constants/dates';
import {transformTime} from '../../../helpers/utils';


const weekDay = (date) => WEEK_DAYS[date.getDay()];
const day = (date) => date.getDate();
const month = (date) => MONTH[date.getMonth()];
const hour = (date) => transformTime(date.getHours());
const minutes = (date) => transformTime(date.getMinutes());


const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timeout = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timeout);
  }, [setDate]);


  return (
     <div className="today-weather__date">
        <span>{`${weekDay(date)} ${day(date)} ${month(date)}`}</span>
        <span className='today-weather__time'>{`${hour(date)}:${minutes(date)}`}</span>
      </div>
  )
};

export default DateTime;
