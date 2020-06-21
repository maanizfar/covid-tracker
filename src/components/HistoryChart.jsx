import React, { useEffect, useContext, useState } from "react";
import { DataContext } from "../state/DataProvider";
import { createLineChart } from "../utils/chart";

const HistoryChart = () => {
  const [chart, setChart] = useState(null);

  const { selectedCountry, historicalData } = useContext(DataContext);

  useEffect(() => {
    const mapToAxesEntries = (data) => {
      const axesEntries = [];
      if (data && historicalData.length !== 0) {
        for (let [key, value] of Object.entries(data)) {
          axesEntries.push({
            t: key,
            y: value,
          });
        }
        return axesEntries;
      }
      return [];
    };

    // console.log("historicalData: ", historicalData);

    const ctx = document.getElementById("historyChart");

    if (chart !== null) chart.destroy();

    const country = historicalData.filter((c) => {
      return c.name === selectedCountry.name;
    })[0];

    if (country) {
      const deaths = mapToAxesEntries(country.timeline["deaths"]);
      const cases = mapToAxesEntries(country.timeline["cases"]);
      const recovered = mapToAxesEntries(country.timeline["recovered"]);

      setChart(
        createLineChart(ctx, [
          {
            label: "Deaths",
            entries: deaths,
            color: "red",
          },
          {
            label: "Recovered",
            entries: recovered,
            color: "green",
          },
          {
            label: "Cases",
            entries: cases,
            color: "blue",
          },
        ])
      );
    }
    //eslint-disable-next-line
  }, [historicalData, selectedCountry]);

  return (
    <div>
      <canvas id="historyChart" height="35%" width="100%"></canvas>
    </div>
  );
};

export default HistoryChart;
