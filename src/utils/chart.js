import Chart from "chart.js";

export const createLineChart = (ctx, data) => {
  return new Chart(ctx, {
    type: "line",
    responsive: true,
    maintainAspectRatio: false,
    data: {
      datasets: data.map((d) => ({
        label: d.label,
        data: d.entries,
        pointRadius: 0,
        fill: false,
        borderColor: d.color,
        borderWidth: 2,
      })),
    },
    options: {
      legend: {
        labels: {
          fontColor: "black",
        },
      },

      tooltips: {
        intersect: false,
        mode: "index",
        axis: "x",
        titleAlign: "center",
        bodySpacing: 6,
        titleFontSize: 20,
        bodyFontSize: 16,
        position: "nearest",
      },

      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "linear",
            time: {
              unit: "week",
              displayFormats: {
                week: "D MMM",
              },
              isoWeekday: true,
              parser: "MM/DD/YYYY",
            },
            ticks: {
              fontColor: "black",
            },
            gridLines: {
              lineWidth: 0.75,
              drawBorder: false,
            },
          },
        ],
        yAxes: [
          {
            position: "right",
            // offset: true,
            // stacked: true,
            ticks: {
              mirror: true,
              fontColor: "black",
            },
            gridLines: {
              lineWidth: 0.75,
              drawBorder: false,
            },
          },
        ],
      },
    },
  });
};

export const createChart = (ctx, type, dataset) => {
  return new Chart(ctx, {
    type: type,
    responsive: true,
    maintainAspectRatio: false,
    data: {
      labels: ["Deaths", "Confirmed Cases", "Recovered"],
      datasets: [
        {
          backgroundColor: ["red", "blue", "green"],
          data: dataset,
        },
      ],
    },
    options: {
      legend: {
        display: type !== "bar",
        position: "top",
        align: "start",
        labels: {},
      },
    },
  });
};
