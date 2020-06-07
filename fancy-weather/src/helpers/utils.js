export const celsiusToFahrenheit = tempInCelsius =>
  (tempInCelsius * (9 / 5)) + 32;

export const checkTempUnits = (curTempInCelsius, isCelsius) =>
  isCelsius ? curTempInCelsius : celsiusToFahrenheit(curTempInCelsius);

export const getIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

export const transformTime = (value) => {
  // console.log('time transform');
  return value < 10 ? `0${value}` : value
};
