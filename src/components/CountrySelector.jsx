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
}));

const CountrySelector = () => {
  const classes = useStyles();

  const { selectedCountry, setCountry, countriesCurrentData } = useContext(
    DataContext
  );

  const makeMenuItems = (countriesData) => {
    let data = [{ countryName: "All", flag: "" }];
    const countries = countriesData.map(({ country, countryInfo }) => ({
      countryName: country,
      flag: countryInfo.flag,
    }));
    return data.concat(countries);
  };

  return (
    <FormControl>
      <Select
        value={selectedCountry}
        disabled={countriesCurrentData === []}
        onChange={(e) => setCountry(e.target.value)}
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
      <FormHelperText>Select Country</FormHelperText>
    </FormControl>
  );
};

export default CountrySelector;
