import * as awsServerlessExpress from "aws-serverless-express";
import express from "express";
import Raven from "raven";
import RavenLambdaWrapper from "serverless-sentry-lib";
import * as next from "next";

const app = next({ dev });

console.log("Lambda 🚀 started");
const binaryMimeTypes = ["*/*"];

const server = awsServerlessExpress.createServer(
    app,
    undefined,
    binaryMimeTypes
);

export const handler = RavenLambdaWrapper.handler(
    Raven,
    (event, context) => {
        awsServerlessExpress.proxy(server, event, context);
    }
);