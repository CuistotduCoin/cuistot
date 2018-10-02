import * as awsServerlessExpress from "aws-serverless-express";
import express from "express";
import Raven from "raven";
import app from "server";
import RavenLambdaWrapper from "serverless-sentry-lib";

let lambdaOrServer;
if (process.env.EXECUTION_ENV === "lambda") {
  console.log("Lambda 🚀 started");
  const binaryMimeTypes = ["*/*"];

  const server = awsServerlessExpress.createServer(
    app,
    undefined,
    binaryMimeTypes
  );
  lambdaOrServer = RavenLambdaWrapper.handler(
    Raven,
    (event: any, context: any) => {
      awsServerlessExpress.proxy(server, event, context);
    }
  );
} else {
  if (module.hot) {
    module.hot.accept("./server", () => {
      console.log("🔁  HMR Reloading `./server`...");
    });
    console.info("✅  Server-side HMR Enabled!");
  }

  const port = process.env.PORT || 3000;

  lambdaOrServer = express()
    .use(app)
    .listen(port, (err: Error) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`🚀 Started on port ${port}`);
    });
}

export const handler = lambdaOrServer;
