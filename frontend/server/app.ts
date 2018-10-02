import * as compression from "compression";
import * as express from "express";
import * as next from "next";
import * as pathMatch from "path-match";
import { parse } from "url";

const dev = process.env.NODE_ENV === "development";
const app = next({ dev });
const handle = app.getRequestHandler();

const route = pathMatch();
const matches = [
  { route: route('/'), page: "/home" },
  { route: route('/workshops/:id'), page: "/workshop" }
];

function createServer() {
  const sv = express();
  sv.use(compression()); // See https://github.com/expressjs/compression/issues/133


  // use next.js
  sv.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    let hasMatch = false;

    for (const match of matches) {
      const params = match.route(pathname);
      if (params) {
        app.render(req, res, match.page, Object.assign(params, query));
        hasMatch = true;
        break;
      }
    }
    if (!hasMatch) {
      handle(req, res, parsedUrl);
    }

    handle(req, res);
  });
  return sv;
}

const server = createServer();

export { server, app }
