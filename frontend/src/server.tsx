import { render } from "@jaredpalmer/after";
import {
  createGenerateClassName,
  MuiThemeProvider
} from "@material-ui/core/styles";
import express from "express";
import * as React from "react";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { renderToString } from "react-dom/server";
// @ts-ignore
import { SheetsRegistry } from "react-jss/lib/jss";
// @ts-ignore
import JssProvider from "react-jss/lib/JssProvider";
import createApolloClient from "./createApolloClient";
import Document from "./Document";
import routes from "./routes";
import theme from "./theme";

let assets: any;
const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", async (req: express.Request, res: express.Response) => {
    const client = createApolloClient({ ssrMode: true });
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();

    const customRenderer = (node: any) => {
      const app = (
        <ApolloProvider client={client}>
          <JssProvider
            registry={sheetsRegistry}
            generateClassName={generateClassName}
          >
            <MuiThemeProvider theme={theme}>{node}</MuiThemeProvider>
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
        assets,
        customRenderer,
        document: Document,
        css: sheetsRegistry.toString()
      };
      const html = await render(options);
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
