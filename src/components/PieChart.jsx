import React, { useContext, useState, useEffect } from "react";

import { DataContext } from "../state/DataProvider";
import { createPieChart } from "../utils/chart";

const PieChart = () => {
  const [chart, setChart] = useState(null);

  const { selectedCountry } = useContext(DataContext);

  useEffect(() => {
    let country = selectedCountry;

    // console.log("DATA: ", data);

    const dataset = [];
    dataset.push(country.deaths);
    dataset.push(country.cases);
    dataset.push(country.recovered);

    if (chart !== null) chart.destroy();

    const ctx = document.getElementById("pieChart");
    setChart(createPieChart(ctx, dataset));
    //eslint-disable-next-line
  }, [selectedCountry]);

  return (
    <div style={{ padding: 32 }}>
      <canvas id="pieChart" width="130" height="130"></canvas>
    </div>
  );
};

export default PieChart;
