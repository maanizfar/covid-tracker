import React from "react";
import Grid from "@material-ui/core/Grid";

import StatBox from "./StatBox";

const StatsContainer = () => {
  return (
    <>
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
    </>
  );
};

export default StatsContainer;
