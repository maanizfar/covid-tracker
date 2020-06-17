import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DataProvider from "./state/DataProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <DataProvider>
    <CssBaseline />
    <App />
  </DataProvider>,
  document.getElementById("root")
);
