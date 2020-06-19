import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Humanize from "humanize-plus";

import { DataContext } from "../state/DataProvider";

const useStyes = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
  },
  label: {
    textTransform: "uppercase",
  },
}));

const StatBox = ({ type, label }) => {
  const classes = useStyes();
  const {
    selectedCountry,
    countriesCurrentData,
    worldCurrentData,
  } = useContext(DataContext);

  let statValue;
  if (selectedCountry === "All") statValue = worldCurrentData[type];
  else {
    const country = countriesCurrentData.filter(
      (c) => c.country === selectedCountry
    );
    country.length === 0
      ? console.error("Country not found in countriesCurrentData")
      : (statValue = country[0][type]);
  }

  return (
    <Box className={classes.box}>
      <Typography align="center" color="textPrimary" variant="h4" noWrap>
        {Humanize.compactInteger(statValue, 1)}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        className={classes.label}
        noWrap
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StatBox;
