import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DataProvider from "./state/DataProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";

ReactDOM.render(
  <DataProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </DataProvider>,
  document.getElementById("root")
);
