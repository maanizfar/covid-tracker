import React, { useEffect, useContext } from "react";
import { DataContext } from "./state/DataProvider";
import Grid from "@material-ui/core/Grid";

import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import StatsContainer from "./components/StatsContainer";
import HistoryChart from "./components/HistoryChart";
import Map from "./components/Map";

import {
  getCountriesCurrentData,
  getCountriesHistorialData,
  getWorldCurrentData,
  getWorldHistorialData,
} from "./utils/API";
import PieChart from "./components/PieChart";

// import {
//   mockCountriesCurrent,
//   mockCountriesHistorical,
//   mockWorldCurrent,
//   mockWorldHistorical,
// } from "./utils/mockData";

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

    // eslint-disable-next-line
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container direction="column" alignItems="stretch">
        <Grid item container>
          <Grid item xs={12} md={9}>
            <Map />
          </Grid>
          <Grid item container direction="column" xs={12} md={3} spacing={2}>
            <Grid item container alignItems="stretch">
              <CountrySelector />
            </Grid>
            <Grid item container>
              <StatsContainer />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={12} md={9}>
            <HistoryChart />
          </Grid>
          <Grid item xs={12} md={3}>
            <PieChart />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
