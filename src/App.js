import React, { useEffect, useContext } from "react";
import { DataContext } from "./state/DataProvider";
import Grid from "@material-ui/core/Grid";

import Header from "./components/Header";
import CountrySelector from "./components/CountrySelector";
import StatsContainer from "./components/StatsContainer";
import HistoryChart from "./components/HistoryChart";
import PieChart from "./components/PieChart";
import JVectorMap from "./components/JVectorMap";

import {
  getCountriesCurrentData,
  getCountriesHistorialData,
  getWorldCurrentData,
  getWorldHistorialData,
} from "./utils/API";

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
    historicalData,
    selectedCountry,
    currentData,
  } = useContext(DataContext);

  useEffect(() => {
    getCountriesCurrentData((data) => recieveCountriesCurrentData(data)).then(
      getWorldCurrentData((data) => recieveWorldCurrentData(data)).then(
        getCountriesHistorialData((data) =>
          recieveCountriesHistoricalData(data)
        ).then(
          getWorldHistorialData((data) => recieveWorldHistoricalData(data))
        )
      )
    );

    // FOR TESTING
    // recieveCountriesCurrentData(mockCountriesCurrent);
    // recieveCountriesHistoricalData(mockCountriesHistorical);
    // recieveWorldCurrentData(mockWorldCurrent);
    // recieveWorldHistoricalData(mockWorldHistorical);

    // eslint-disable-next-line
  }, []);

  // console.log(selectedCountry, currentData, historicalData);

  if (
    Object.keys(selectedCountry).length === 0 ||
    Object.keys(currentData).length < 1 ||
    Object.keys(historicalData).length < 1
  ) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container direction="column" alignItems="stretch">
        <Grid item container>
          <Grid item xs={12} md={9}>
            <JVectorMap />
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
