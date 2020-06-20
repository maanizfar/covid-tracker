const countriesCurrentDataURL = "https://disease.sh/v2/countries";
const countriesHistoricalURL = "https://disease.sh/v2/historical?lastdays=all";
const worldCurrentDataURL = "https://disease.sh/v2/all";
const worldHistoricalURL = "https://disease.sh/v2/historical/all?lastdays=all";

export const getCountriesCurrentData = (successCallback) => {
  return fetchData(countriesCurrentDataURL, successCallback);
};

export const getCountriesHistorialData = (successCallback) => {
  return fetchData(countriesHistoricalURL, successCallback);
};

export const getWorldCurrentData = (successCallback) => {
  return fetchData(worldCurrentDataURL, successCallback);
};

export const getWorldHistorialData = (successCallback) => {
  return fetchData(worldHistoricalURL, successCallback);
};

const fetchData = (url, successCallback) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      successCallback(data);
    })
    .catch((err) => console.error(err));
};
