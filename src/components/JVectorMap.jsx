import React, { useContext } from "react";
import { VectorMap } from "react-jvectormap";
import { DataContext } from "../state/DataProvider";
import Humanize from "humanize-plus";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const JVectorMap = () => {
  const { currentData, setCountry, historicalData } = useContext(DataContext);

  const sm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleClick = (e, countryCode) => {
    const country = currentData.filter((c) => c.iso2 === countryCode)[0];
    if (
      country !== null &&
      historicalData.filter((c) => c.name === country.name).length !== 0
    )
      setCountry(country);
    setTimeout(() => {
      Array.from(document.getElementsByClassName("jvectormap-tip")).forEach(
        (el) => {
          el.style.display = "none";
        }
      );
    }, 100);
  };

  const handleHover = (e, el, code) => {
    const country = currentData.filter((c) => c.iso2 === code)[0];
    if (country === undefined) return;

    const { cases, deaths, recovered } = country;

    el.html(
      `<strong style='font-size: 1rem;'>${el.html()}</strong>` +
        `<br>Cases: ${Humanize.compactInteger(
          cases
        )}<br>Deaths: ${Humanize.compactInteger(
          deaths
        )}<br>Recovered: ${Humanize.compactInteger(recovered)}`
    );
  };

  const mapData = {};

  currentData.forEach((c) => {
    mapData[c.iso2] = c.cases;
  });

  return (
    <div>
      <VectorMap
        map="world_mill"
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomOnScroll={true}
        zoomAnimate={true}
        containerStyle={{
          width: "100%",
          height: sm ? "300px" : "460px",
        }}
        onRegionClick={(e, countryCode) => handleClick(e, countryCode)} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "#000000",
            "stroke-width": 0.2,
            "stroke-opacity": 0.2,
          },
          hover: {
            fill: "#2938bc",
            "fill-opacity": 0.9,
            cursor: "pointer",
          },
          selected: {
            fill: "#2938bc", //color for the clicked country
          },
          selectedHover: {},
        }}
        // regionsSelectable={true}
        onRegionTipShow={handleHover}
        series={{
          regions: [
            {
              values: mapData, //this is your data
              scale: ["#edf8b1", "#7fcdbb", "#2c7fb8"],
              // scale: ["#ffeda0", "#feb24c", "#f03b20"],
              normalizeFunction: "polynomial",
              legend: {
                vertical: false,
                title: "Cases",
                labelRender: (a) => Humanize.compactInteger(a),
              },
            },
          ],
        }}
      />
    </div>
  );
};
export default JVectorMap;
