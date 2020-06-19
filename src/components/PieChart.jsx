import React, { useContext, useState, useEffect } from "react";

import { DataContext } from "../state/DataProvider";
import { createPieChart } from "../utils/chart";

const PieChart = () => {
  const [chart, setChart] = useState(null);

  const {
    selectedCountry,
    countriesCurrentData,
    worldCurrentData,
  } = useContext(DataContext);

  useEffect(() => {
    let data;
    if (selectedCountry === "All") data = worldCurrentData;
    else {
      const country = countriesCurrentData.filter(
        (c) => c.country === selectedCountry
      );
      country.length === 0
        ? console.error("Country not found in countriesCurrentData")
        : (data = country[0]);
    }

    // console.log("DATA: ", data);

    const dataset = [];
    dataset.push(data.deaths);
    dataset.push(data.cases);
    dataset.push(data.recovered);

    if (chart !== null) chart.destroy();

    const ctx = document.getElementById("pieChart");
    setChart(createPieChart(ctx, dataset));
    //eslint-disable-next-line
  }, [selectedCountry, countriesCurrentData, worldCurrentData]);

  return <canvas id="pieChart" width="100%" height="100%"></canvas>;
};

export default PieChart;
