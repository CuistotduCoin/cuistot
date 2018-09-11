import { After, ensureReady } from "@jaredpalmer/after";
import {
  createGenerateClassName,
  MuiThemeProvider
} from "@material-ui/core/styles";
import algoliasearch from "algoliasearch/lite";
import createApolloClient from "createApolloClient";
import moment from 'moment';
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { hydrate } from "react-dom";
import { InstantSearch } from "react-instantsearch-dom";
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import { BrowserRouter } from "react-router-dom";
import routes from "routes";
import "shared/auth";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import theme from "theme";
import "typeface-roboto";
import UNSTATED from "unstated-debug";
import { runtimeConfig } from "./config";
import "./main.css";

const client = createApolloClient({ ssrMode: false });
const sheetsRegistry = new SheetsRegistry();
const generateClassName = createGenerateClassName({
  productionPrefix: "c"
});
const searchClient = algoliasearch(
  runtimeConfig.ALGOLIASEARCH_SEARCH_APP_ID,
  runtimeConfig.ALGOLIASEARCH_SEARCH_KEY
);

if (process.env.NODE_ENV === "development") {
  UNSTATED.logStateChanges = true;
  // @ts-ignore
  window.LOG_LEVEL = "DEBUG";
}

moment.locale('fr');

ensureReady(routes).then(data =>
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider theme={theme}>
            <InstantSearch
              searchClient={searchClient}
              indexName={runtimeConfig.ALGOLIASEARCH_SEARCH_APP_ID}
              // searchState={this.props.searchState}
              // resultsState={this.props.resultsState}
            >
              <After data={data} routes={routes} />
            </InstantSearch>
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
