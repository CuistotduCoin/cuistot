import serverless from "serverless-http";
import appServer from "./app";

const binaryMimeTypes = ["*/*"];
const handler = serverless(appServer, {
  binary: binaryMimeTypes
});
exports.handler = (evt, ctx, callback) => handler(evt, ctx, callback);
