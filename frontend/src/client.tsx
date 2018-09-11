import { After, ensureReady } from "@jaredpalmer/after";
import {
  createGenerateClassName,
  MuiThemeProvider
} from "@material-ui/core/styles";
import * as React from "react";
import { hydrate } from "react-dom";
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import { BrowserRouter } from "react-router-dom";
import routes from "routes";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import theme from "theme";
import "typeface-roboto";
import "./main.css";

const sheetsRegistry = new SheetsRegistry();
const generateClassName = createGenerateClassName({
  productionPrefix: "c"
});

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme}>
          <After data={data} routes={routes} />
        </MuiThemeProvider>
      </JssProvider>
    </BrowserRouter>,
    document.getElementById("root"),
    () => {
      const jssStyles = document.getElementById("jss-ssr");
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
  )
);

if (module.hot) {
  module.hot.accept();
}
