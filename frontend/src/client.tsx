import { After, ensureReady } from "@jaredpalmer/after";
import { MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { hydrate } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto";
import createApolloClient from "./createApolloClient";
import routes from "./routes";
import theme from "./theme";

const client = createApolloClient({ ssrMode: false });

ensureReady(routes).then(data =>
  hydrate(
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <After data={data} routes={routes} />
          </MuiThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
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
