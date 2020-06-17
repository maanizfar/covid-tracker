import React, { createContext, useReducer } from "react";
import reducer, {
  RECIEVE_WORLD_CURRENT,
  RECIEVE_WORLD_HISTORICAL,
  RECIEVE_COUNTRIES_CURRENT,
  RECIEVE_COUNTRIES_HISTORICAL,
  SET_COUNTRY,
} from "./DataReducer";

const initialState = {
  worldCurrentData: {},
  worldHistoricalData: {},
  countriesCurrentData: [],
  countriesHistoricalData: [],
  selectedCountry: "all",
};

export const DataContext = createContext(initialState);

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function recieveCountriesCurrentData(data) {
    console.log("RECIEVED COUNTRIES CURRENT: ", data);
    dispatch({
      type: RECIEVE_COUNTRIES_CURRENT,
      payload: data,
    });
  }

  function recieveCountriesHistoricalData(data) {
    console.log("RECIEVED COUNTRIES HISTORICAL:  ", data);
    dispatch({
      type: RECIEVE_COUNTRIES_HISTORICAL,
      payload: data,
    });
  }
  function recieveWorldCurrentData(data) {
    console.log("RECIEVED WORLD CURRENT: ", data);
    dispatch({
      type: RECIEVE_WORLD_CURRENT,
      payload: data,
    });
  }

  function recieveWorldHistoricalData(data) {
    console.log("RECIEVED WORLD HISTORICAL:  ", data);
    dispatch({
      type: RECIEVE_WORLD_HISTORICAL,
      payload: data,
    });
  }

  function setCountry(countryName) {
    console.log("SETCOUNTRY: " + countryName);
    dispatch({
      type: SET_COUNTRY,
      payload: countryName,
    });
  }

  return (
    <DataContext.Provider
      value={{
        worldCurrentData: state.worldCurrentData,
        worldHistoricalData: state.worldHistoricalData,
        countriesCurrentData: state.countriesCurrentData,
        countriesHistoricalData: state.countriesHistoricalData,
        selectedCountry: state.selectedCountry,
        recieveCountriesCurrentData,
        recieveCountriesHistoricalData,
        recieveWorldCurrentData,
        recieveWorldHistoricalData,
        setCountry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
