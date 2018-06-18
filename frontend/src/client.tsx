import { After, ensureReady } from "@jaredpalmer/after";
import { MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { hydrate } from "react-dom";
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

ensureReady(routes).then(data =>
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <After data={data} routes={routes} />
        </MuiThemeProvider>
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
