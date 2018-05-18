import * as React from "react";
import * as ReactDOM from "react-dom";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

import "typeface-roboto";
import App from "./App";
import theme from "./theme";

ReactDOM.hydrate(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
