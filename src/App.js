import React, { useEffect, useContext } from "react";
import { DataContext } from "./state/DataProvider";
import Grid from "@material-ui/core/Grid";

import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import StatBox from "./components/StatBox";

// import {
//   getCountriesCurrentData,
//   getCountriesHistorialData,
//   getWorldCurrentData,
//   getWorldHistorialData,
// } from "./utils/API";

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
    // getCountriesCurrentData((data) => recieveCountriesCurrentData(data));
    // getWorldCurrentData((data) => recieveWorldCurrentData(data));
    // getWorldHistorialData((data) => recieveWorldHistoricalData(data));
    // getCountriesHistorialData((data) => recieveCountriesHistoricalData(data));

    // FOR TESTING
    recieveCountriesCurrentData(mockCountriesCurrent);
    recieveCountriesHistoricalData(mockCountriesHistorical);
    recieveWorldCurrentData(mockWorldCurrent);
    recieveWorldHistoricalData(mockWorldHistorical);

    // eslint-disable-next-line
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container direction="column" alignItems="stretch">
        <Grid item container>
          <Grid item xs={12} md={8}>
            <CountrySelector />
          </Grid>
          <Grid item xs={12} md={4} container>
            <Grid item xs={6}>
              <StatBox type="cases" label="Total Cases" />
            </Grid>
            <Grid item xs={6}>
              <StatBox type="todayCases" label="cases today" />
            </Grid>
            <Grid item xs={6}>
              <StatBox type="deaths" label="Total Deaths" />
            </Grid>
            <Grid item xs={6}>
              <StatBox type="todayDeaths" label="Today's deaths" />
            </Grid>
            <Grid item xs={6}>
              <StatBox type="recovered" label="Total Recovered" />
            </Grid>
            <Grid item xs={6}>
              <StatBox type="todayRecovered" label="Today's Recovered" />
            </Grid>
            <Grid item xs={6}>
              <StatBox type="active" label="Active" />
            </Grid>
            <Grid item xs={6} sm={6}>
              <StatBox type="critical" label="critical" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={8}>
            History
          </Grid>
          <Grid item xs={4}>
            Charts
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
