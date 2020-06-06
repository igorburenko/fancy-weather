const openWeatherApiURL = 'http://api.openweathermap.org/data/2.5/weather';
const openWeatherForecastApiURL = 'http://api.openweathermap.org/data/2.5/onecall';
const apiKey = '8c7c9e8305236e64ef51bf87c5594447';
const mapboxGeocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapboxApiKey = 'sk.eyJ1IjoiaWdvcmJ1cmVua28iLCJhIjoiY2tiMHMycXk4MGF4dDJ5bXRub3ZlcHB0aCJ9.5nVUVCmH5Lydtnj8rQXqFQ';

export const getWeather = async (cityName, celsius) => {
  let url = `${openWeatherApiURL}?q=${cityName}&appid=${apiKey}`;
  url = celsius ? `${url}&units=metric` : `${url}&units=imperial`;
  const apiResponse = await fetch(url);
  return await apiResponse.json();
};

export const getForecast = async (lat, lon, celsius) => {
  let url = `${openWeatherForecastApiURL}?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`;
  url = celsius ? `${url}&units=metric` : `${url}&units=imperial`;
  const apiResponse = await fetch(url);
  return await apiResponse.json();
};

export const getCity = async (cityName) => {
  let url = `${mapboxGeocodingUrl}${cityName}.json?types=place&access_token=${mapboxApiKey}`;
  const apiResponse = await fetch(url);
  return await apiResponse.json();
};
// api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={your api key}
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid={YOUR API KEY}
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDJUhAiOfwHT3rhncQJTwvDQ4c8y5WZptE
// https://api.mapbox.com/geocoding/v5/mapbox.places/odesa.json?access_token=sk.eyJ1IjoiaWdvcmJ1cmVua28iLCJhIjoiY2tiMHMycXk4MGF4dDJ5bXRub3ZlcHB0aCJ9.5nVUVCmH5Lydtnj8rQXqFQ
