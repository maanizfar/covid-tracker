import React, { useEffect, useContext } from "react";
import { DataContext } from "../state/DataProvider";
import { createChart } from "../utils/chart";

const HistoryChart = () => {
  const {
    selectedCountry,
    countriesHistoricalData,
    worldHistoricalData,
  } = useContext(DataContext);

  useEffect(() => {
    const getCurrentCountryData = () => {
      return countriesHistoricalData.filter(
        (c) => c.country === selectedCountry
      )[0].timeline;
    };

    const getData = (type) => {
      if (selectedCountry === "All") return worldHistoricalData[type];
      else return getCurrentCountryData()[type];
    };

    const mapToAxesEntries = (data) => {
      const axesEntries = [];
      if (countriesHistoricalData.length !== 0) {
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

    createChart(document.getElementById("langChart"), "line", [
      {
        label: "Deaths",
        entries: mapToAxesEntries(getData("deaths")),
        color: "red",
      },
      {
        label: "Recovered",
        entries: mapToAxesEntries(getData("recovered")),
        color: "green",
      },
      {
        label: "Cases",
        entries: mapToAxesEntries(getData("cases")),
        color: "blue",
      },
    ]);
  }, [worldHistoricalData, countriesHistoricalData, selectedCountry]);

  return <canvas id="langChart" width="400" height="150"></canvas>;
};

export default HistoryChart;
