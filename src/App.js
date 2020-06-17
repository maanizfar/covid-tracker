import React, { useEffect, useContext } from "react";
import { DataContext } from "./state/DataProvider";
import Grid from "@material-ui/core/Grid";

import Header from "./components/Header";

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
          <Grid item xs={8}>
            Map
          </Grid>
          <Grid item xs={4}>
            Stats
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
