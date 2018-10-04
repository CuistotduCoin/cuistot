import { render } from "@jaredpalmer/after";
import Document from "Document";
import express from "express";
import path from "path";
import routes from "routes";

let assets: any;
const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable("x-powered-by")
  .use(express.static(path.join(__dirname, "../build/public")!))
  .get("/*", async (req: express.Request, res: express.Response) => {
    try {
      const options = {
        req,
        res,
        routes,
        // tslint:disable-next-line:object-literal-sort-keys
        assets,
        document: Document
      };
      const html = await render(options);
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
