import { render } from "@jaredpalmer/after";
import {
  createGenerateClassName,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Document from "Document";
import express from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import routes from "routes";
import theme from "theme";

let assets: any;
const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", async (req: express.Request, res: express.Response) => {
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName({
      productionPrefix: "c"
    });

    const customRenderer = (node: any) => {
      const app = (
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            {node}
          </MuiThemeProvider>
        </JssProvider>
      );
      return renderToString(app);
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
