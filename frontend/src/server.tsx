import { render } from "@jaredpalmer/after";
import { MuiThemeProvider } from "@material-ui/core/styles";
import express from "express";
import * as React from "react";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { renderToString } from "react-dom/server";
import createApolloClient from "./createApolloClient";
import Document from "./Document";
import routes from "./routes";
import theme from "./theme";

let assets: any;
const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", async (req: express.Request, res: express.Response) => {
    const client = createApolloClient({ ssrMode: true });

    const customRenderer = (node: any) => {
      const app = (
        <ApolloProvider client={client}>
          <MuiThemeProvider theme={theme}>{node}</MuiThemeProvider>
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
        document: Document
      };
      const html = await render(options);
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
