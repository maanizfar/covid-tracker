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
  const { selectedCountry } = useContext(DataContext);

  // console.log("Selected: ", selectedCountry);

  if (selectedCountry === undefined) {
    return (
      <Box className={classes.box}>
        <Typography
          align="center"
          color="textPrimary"
          className={classes.label}
          noWrap
        >
          loading...
        </Typography>
      </Box>
    );
  }

  const value = selectedCountry[type];

  return (
    <Box className={classes.box}>
      <Typography align="center" color="textPrimary" variant="h4" noWrap>
        {value !== undefined ? Humanize.compactInteger(value, 1) : "---"}
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
