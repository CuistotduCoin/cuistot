import * as serverless from "serverless-http";
import { app, server } from "./app";

const binaryMimeTypes = ["*/*"];

exports.handler = (event, context, callback) => {
  app.prepare()
    .then(() => {

      const handler = serverless(server, {
        binary: binaryMimeTypes,
      });
      return handler(event, context, callback);
    });
};
