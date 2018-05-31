import * as awsServerlessExpress from "aws-serverless-express";
import express from "express";
import app from "./server";

let handler;
if (process.env.EXECUTION_ENV === "lambda") {
  console.log("Lambda 🚀 started");
  const binaryMimeTypes = [
    "application/octet-stream",
    "font/eot",
    "font/opentype",
    "font/otf",
    "image/jpeg",
    "image/png",
    "image/svg+xml"
  ];

  const server = awsServerlessExpress.createServer(
    app,
    undefined,
    binaryMimeTypes
  );
  handler = (event: any, context: any) =>
    awsServerlessExpress.proxy(server, event, context);
} else {
  if (module.hot) {
    module.hot.accept("./server", () => {
      console.log("🔁  HMR Reloading `./server`...");
    });
    console.info("✅  Server-side HMR Enabled!");
  }

  const port = process.env.PORT || 3000;

  handler = express()
    .use(app)
    .listen(port, (err: Error) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`🚀 Started on port ${port}`);
    });
}

export default handler;
