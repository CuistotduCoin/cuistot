import { render } from "@jaredpalmer/after";
import {
  createGenerateClassName,
  MuiThemeProvider
} from "@material-ui/core/styles";
import algoliasearch from "algoliasearch/lite";
import createApolloClient from "createApolloClient";
import Document from "Document";
import express from "express";
import * as React from "react";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { renderToString } from "react-dom/server";
import { createInstantSearch } from "react-instantsearch-dom/server";
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import routes from "routes";
import theme from "theme";

let assets: any;
const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const searchClient = algoliasearch(
  process.env.ALGOLIASEARCH_SEARCH_APP_ID,
  process.env.ALGOLIASEARCH_SEARCH_KEY
);

const server = express()
  .disable("x-powered-by")
  .use(express.static("./build/public"))
  .get("/*", async (req: express.Request, res: express.Response) => {
    const client = createApolloClient({ ssrMode: true });
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName({
      productionPrefix: "c"
    });

    // change searchState & resultsState
    const searchState = { query: "" };
    const { InstantSearch, findResultsState } = createInstantSearch();
    const appInitialState = { searchState, findResultsState };

    const customRenderer = (node: any) => {
      const app = (
        <ApolloProvider client={client}>
          <JssProvider
            registry={sheetsRegistry}
            generateClassName={generateClassName}
          >
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
              <InstantSearch
                searchClient={searchClient}
                indexName={process.env.ALGOLIASEARCH_SEARCH_APP_ID}
                searchState={searchState}
              >
                {node}
              </InstantSearch>
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
      );
      return getDataFromTree(app).then(() => {
        const initialApolloState = client.extract();
        const html = renderToString(app);
        return { html, initialApolloState };
      });
    };

    try {
      const options = {
        req,
        res,
        routes,
        // tslint:disable-next-line:object-literal-sort-keys
        appInitialState,
        assets,
        customRenderer,
        document: Document,
        css: sheetsRegistry.toString()
      };
      const html = await render(options);
      res.send(html);
    } catch (error) {
      console.error(error);
      res.json({ message: error.message, stack: error.stack });
    }
  });

export default server;
