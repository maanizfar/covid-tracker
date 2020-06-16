import React, { useEffect, useContext } from "react";
import { DataContext } from "./state/DataProvider";

import {
  getCountriesCurrentData,
  getCountriesHistorialData,
  getWorldCurrentData,
  getWorldHistorialData,
} from "./utils/API";

import {
  mockCountriesCurrent,
  mockCountriesHistorical,
  mockWorldCurrent,
  mockWorldHistorical,
} from "./utils/mockData";

function App() {
  const {
    recieveWorldCurrentData,
    recieveWorldHistoricalData,
    recieveCountriesCurrentData,
    recieveCountriesHistoricalData,
  } = useContext(DataContext);

  useEffect(() => {
    getCountriesCurrentData((data) => recieveCountriesCurrentData(data));
    getWorldCurrentData((data) => recieveWorldCurrentData(data));
    getWorldHistorialData((data) => recieveWorldHistoricalData(data));
    getCountriesHistorialData((data) => recieveCountriesHistoricalData(data));

    // FOR TESTING
    // recieveCountriesCurrentData(mockCountriesCurrent);
    // recieveCountriesHistoricalData(mockCountriesHistorical);
    // recieveWorldCurrentData(mockWorldCurrent);
    // recieveWorldHistoricalData(mockWorldHistorical);
  }, []);

  return <div>Covid Tracker</div>;
}

export default App;
