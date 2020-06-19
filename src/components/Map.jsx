import React, { useContext, useEffect } from "react";
import { DataContext } from "../state/DataProvider";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

var countryColor = am4core.color("yellow");
var countryStrokeColor = am4core.color("#000000");
var countryHoverColor = am4core.color("orange");
var activeCountryColor = am4core.color("#1c5fe5");

const Map = () => {
  const { countriesCurrentData, setCountry, selectedCountry } = useContext(
    DataContext
  );

  useEffect(() => {
    let mapChart = am4core.create("mapdiv", am4maps.MapChart);

    let mapData = countriesCurrentData.map((country) => ({
      id: country.countryInfo.iso2,
      name: country.country,
      value: country.cases,
    }));

    mapChart.geodata = am4geodata_worldLow;

    mapChart.projection = new am4maps.projections.Miller();

    // Map polygon series (defines how country areas look and behave)
    var polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.dataFields.id = "id";
    polygonSeries.dataFields.value = "value";
    polygonSeries.interpolationDuration = 0;

    polygonSeries.exclude = ["AQ"]; // Antarctica is excluded in non-globe projection
    polygonSeries.useGeodata = true;

    // this helps to place bubbles in the visual middle of the area
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.data = mapData;

    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = countryColor;
    polygonTemplate.fillOpacity = 0.5;
    polygonTemplate.stroke = countryStrokeColor;
    polygonTemplate.strokeOpacity = 0.15;

    polygonTemplate.events.on("hit", handleCountryHit);
    polygonTemplate.events.on("over", handleCountryOver);
    polygonTemplate.events.on("out", handleCountryOut);

    // polygon states
    var polygonHoverState = polygonTemplate.states.create("hover");
    polygonHoverState.transitionDuration = 500;
    polygonHoverState.properties.fill = countryHoverColor;

    var polygonActiveState = polygonTemplate.states.create("active");
    polygonActiveState.properties.fill = activeCountryColor;

    // Bubble series
    var bubbleSeries = mapChart.series.push(new am4maps.MapImageSeries());
    bubbleSeries.data = JSON.parse(JSON.stringify(mapData));

    bubbleSeries.dataFields.value = "value";
    bubbleSeries.dataFields.id = "id";

    // adjust tooltip
    bubbleSeries.tooltip.animationDuration = 0;
    bubbleSeries.tooltip.showInViewport = false;
    bubbleSeries.tooltip.background.fillOpacity = 1;
    bubbleSeries.tooltip.getStrokeFromObject = true;
    bubbleSeries.tooltip.getFillFromObject = false;
    bubbleSeries.tooltip.background.fillOpacity = 1;
    bubbleSeries.tooltip.background.fill = am4core.color("#000000");

    var imageTemplate = bubbleSeries.mapImages.template;
    // if you want bubbles to become bigger when zoomed, set this to false
    imageTemplate.nonScaling = true;
    imageTemplate.strokeOpacity = 0;
    imageTemplate.fillOpacity = 0.55;
    imageTemplate.tooltipText = "{name}: [bold]{value}[/]";
    imageTemplate.applyOnClones = true;

    // this is needed for the tooltip to point to the top of the circle instead of the middle
    imageTemplate.adapter.add("tooltipY", function (tooltipY, target) {
      return -target.children.getIndex(0).radius;
    });

    // add circle inside the image
    var circle = imageTemplate.createChild(am4core.Circle);
    // // this makes the circle to pulsate a bit when showing it
    circle.hiddenState.properties.scale = 0.0001;
    circle.hiddenState.transitionDuration = 2000;
    circle.defaultState.transitionDuration = 2000;
    circle.defaultState.transitionEasing = am4core.ease.elasticOut;
    // // later we set fill color on template (when changing what type of data the map should show) and all the clones get the color because of this
    circle.applyOnClones = true;

    // heat rule makes the bubbles to be of a different width. Adjust min/max for smaller/bigger radius of a bubble
    bubbleSeries.heatRules.push({
      target: circle,
      property: "radius",
      min: 3,
      max: 25,
      dataField: "value",
    });

    // when data items validated, hide 0 value bubbles (because min size is set)
    bubbleSeries.events.on("dataitemsvalidated", function () {
      bubbleSeries.dataItems.each((dataItem) => {
        var mapImage = dataItem.mapImage;
        var circle = mapImage.children.getIndex(0);
        if (mapImage.dataItem.value === 0) {
          circle.hide(0);
        } else if (circle.isHidden || circle.isHiding) {
          circle.show();
        }
      });
    });

    // this places bubbles at the visual center of a country
    imageTemplate.adapter.add("latitude", function (latitude, target) {
      var polygon = polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLatitude;
      } else {
        target.disabled = true;
      }
      return latitude;
    });

    imageTemplate.adapter.add("longitude", function (longitude, target) {
      var polygon = polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLongitude;
      } else {
        target.disabled = true;
      }
      return longitude;
    });

    function handleCountryHit(event) {
      const countryName = event.target.dataItem.dataContext.name;
      if (selectedCountry !== countryName) {
        setCountry(countryName);
        selectCountry(event.target);
      }
    }

    function handleCountryOver(event) {
      rollOverCountry(event.target);
    }

    function handleCountryOut(event) {
      rollOutCountry(event.target);
    }

    function resetHover() {
      polygonSeries.mapPolygons.each(function (polygon) {
        polygon.isHover = false;
      });

      bubbleSeries.mapImages.each(function (image) {
        image.isHover = false;
      });
    }

    // calculate zoom level (default is too close)
    function getZoomLevel(mapPolygon) {
      var w = mapPolygon.polygon.bbox.width;
      var h = mapPolygon.polygon.bbox.width;
      // change 2 to smaller walue for a more close zoom
      return Math.min(
        mapChart.seriesWidth / (w * 2),
        mapChart.seriesHeight / (h * 2)
      );
    }

    function selectCountry(mapPolygon) {
      resetHover();
      polygonSeries.hideTooltip();

      // make others inactive
      polygonSeries.mapPolygons.each(function (polygon) {
        polygon.isActive = false;
      });

      mapPolygon.isActive = true;
      mapChart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
    }

    // what happens when a country is rolled-over
    function rollOverCountry(mapPolygon) {
      resetHover();
      if (mapPolygon) {
        mapPolygon.isHover = true;

        // make bubble hovered too
        var image = bubbleSeries.getImageById(mapPolygon.dataItem.id);
        if (image) {
          image.dataItem.dataContext.name =
            mapPolygon.dataItem.dataContext.name;
          image.isHover = true;
        }
      }
    }

    // what happens when a country is rolled-out
    function rollOutCountry(mapPolygon) {
      var image = bubbleSeries.getImageById(mapPolygon.dataItem.id);

      resetHover();
      if (image) {
        image.isHover = false;
      }
    }

    return () => {
      if (mapChart) mapChart.dispose();
    };
    //eslint-disable-next-line
  }, [countriesCurrentData]);

  return <div id="mapdiv" style={{ width: "100%", height: "100%" }}></div>;
};

export default Map;
