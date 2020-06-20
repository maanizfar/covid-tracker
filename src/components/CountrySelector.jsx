import React, { useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import { DataContext } from "../state/DataProvider";

const useStyles = makeStyles((theme) => ({
  flag: {
    marginRight: theme.spacing(1),
  },
  root: {
    width: "100%",
  },
}));

const CountrySelector = () => {
  const classes = useStyles();

  const {
    selectedCountry,
    setCountry,
    currentData,
    historicalData,
  } = useContext(DataContext);

  // console.log("CurrentData: ", currentData);
  // console.log("Selected Country", selectedCountry);

  const cleanedMenuItems = () => {
    return currentData.filter(({ name }) => {
      if (name === "World") return true;
      else return historicalData.map((c) => c.name).includes(name);
    });
  };

  function isWorldInCurrentData() {
    return currentData.filter((c) => c.name === "World").length !== 0;
  }

  const handleChange = (e) =>
    setCountry(currentData.filter((c) => c.name === e.target.value)[0]);

  return (
    <FormControl className={classes.root}>
      <FormHelperText>Select Country</FormHelperText>
      <Select
        value={isWorldInCurrentData() ? selectedCountry.name : ""}
        disabled={currentData === []}
        onChange={handleChange}
        fullWidth={true}
      >
        {currentData &&
          cleanedMenuItems().map(({ name, flag }) => (
            <MenuItem key={name} value={name}>
              {flag && (
                <img
                  src={flag}
                  alt={`flag of ${name}`}
                  width={24}
                  className={classes.flag}
                />
              )}
              {name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelector;
