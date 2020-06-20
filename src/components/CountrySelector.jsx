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
    countriesCurrentData,
    countriesHistoricalData,
  } = useContext(DataContext);

  const makeMenuItems = (countriesData) => {
    let data = [{ countryName: "All", flag: "" }];
    let countries = countriesData.filter(({ country }) =>
      countriesHistoricalData.map((c) => c.country).includes(country)
    );

    countries = countries.map(({ country, countryInfo }) => {
      return {
        countryName: country,
        flag: countryInfo.flag,
      };
    });
    return data.concat(countries);
  };

  return (
    <FormControl className={classes.root}>
      <FormHelperText>Select Country</FormHelperText>
      <Select
        value={selectedCountry}
        disabled={countriesCurrentData === []}
        onChange={(e) => setCountry(e.target.value)}
        fullWidth={true}
      >
        {countriesCurrentData &&
          makeMenuItems(countriesCurrentData).map(({ countryName, flag }) => (
            <MenuItem key={countryName} value={countryName}>
              {flag && (
                <img
                  src={flag}
                  alt={`flag of ${countryName}`}
                  width={24}
                  className={classes.flag}
                />
              )}
              {countryName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelector;
