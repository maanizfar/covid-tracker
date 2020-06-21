import React, { useContext, useState, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { DataContext } from "../state/DataProvider";
import { createChart } from "../utils/chart";

const PieChart = () => {
  const [chart, setChart] = useState(null);
  const [dataset, setDataset] = useState([]);
  const [checked, setChecked] = useState(false);

  const { selectedCountry } = useContext(DataContext);

  useEffect(() => {
    let country = selectedCountry;

    // console.log("DATA: ", data);

    const data = [];
    data.push(country.deaths);
    data.push(country.cases);
    data.push(country.recovered);
    setDataset(data);

    if (chart !== null) chart.destroy();
    const ctx = document.getElementById("pieChart");
    setChart(createChart(ctx, checked ? "bar" : "pie", data));

    //eslint-disable-next-line
  }, [selectedCountry]);

  const toggleChecked = (e) => {
    // console.log("checked: ", e.target.checked);
    setChecked(e.target.checked);

    if (chart !== null) chart.destroy();
    const ctx = document.getElementById("pieChart");
    setChart(createChart(ctx, e.target.checked ? "bar" : "pie", dataset));
  };

  return (
    <div style={{ padding: 32 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={toggleChecked} />}
        label="Bar Chart"
      />

      <canvas id="pieChart" width="130" height="130"></canvas>
    </div>
  );
};

export default PieChart;
