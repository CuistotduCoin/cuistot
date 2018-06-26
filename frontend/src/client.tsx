import { After, ensureReady } from "@jaredpalmer/after";
import {
  createGenerateClassName,
  MuiThemeProvider
} from "@material-ui/core/styles";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { hydrate } from "react-dom";
// @ts-ignore
import { SheetsRegistry } from "react-jss/lib/jss";
// @ts-ignore
import JssProvider from "react-jss/lib/JssProvider";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "typeface-roboto";
import createApolloClient from "./createApolloClient";
import "./main.css";
import routes from "./routes";
import awsconfig from "./shared/auth";
import theme from "./theme";

const client = createApolloClient({ ssrMode: false });
const sheetsRegistry = new SheetsRegistry();
const generateClassName = createGenerateClassName({
  productionPrefix: "c"
});

ensureReady(routes).then(data =>
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider theme={theme}>
            <After data={data} routes={routes} />
          </MuiThemeProvider>
        </JssProvider>
      </BrowserRouter>
    </ApolloProvider>,
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
