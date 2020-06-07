const openWeatherForecastApiURL = 'https://api.openweathermap.org/data/2.5/onecall';
const apiKey = '8c7c9e8305236e64ef51bf87c5594447';
const mapboxGeocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapboxApiKey = 'sk.eyJ1IjoiaWdvcmJ1cmVua28iLCJhIjoiY2tiMHMycXk4MGF4dDJ5bXRub3ZlcHB0aCJ9.5nVUVCmH5Lydtnj8rQXqFQ';
const ipiinfoAccessToken = '038c551d008b12';
const unsplashKey = 'FfgsqzaPmoLkizyMEcNZt9QHmoQLau4h1iUmWNzINFE';


export const getForecast = async (lat, lon) => {
  let url = `${openWeatherForecastApiURL}?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;
  const apiResponse = await fetch(url);
  return await apiResponse.json();
};

export const getCity = async (cityName) => {
  let url = `${mapboxGeocodingUrl}${cityName}.json?types=place&access_token=${mapboxApiKey}`;
  const apiResponse = await fetch(url);
  return await apiResponse.json();
};

export const getUserLocation = async () => {
  const url = `https://ipinfo.io/json?token=${ipiinfoAccessToken}`;
  const apiResponse = await fetch(url);
  return await apiResponse.json();
};

export const getBackgroundImage = async () => {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=${unsplashKey}`;
  const apiResponse = await fetch(url);
  return await apiResponse.json();
};

// https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17
// https://ipinfo.io/json?token=eb5b90bb77d46a
// api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={your api key}
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid={YOUR API KEY}
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDJUhAiOfwHT3rhncQJTwvDQ4c8y5WZptE
// https://api.mapbox.com/geocoding/v5/mapbox.places/odesa.json?access_token=sk.eyJ1IjoiaWdvcmJ1cmVua28iLCJhIjoiY2tiMHMycXk4MGF4dDJ5bXRub3ZlcHB0aCJ9.5nVUVCmH5Lydtnj8rQXqFQ
