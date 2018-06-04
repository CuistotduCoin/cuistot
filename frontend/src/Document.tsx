import { AfterData, AfterRoot } from "@jaredpalmer/after";
import React, { Component } from "react";

export interface IDocumentProps {
  helmet: any;
  assets: any;
  data: any;
  initialApolloState: any;
  css: any;
}

export default class Document extends Component<IDocumentProps, {}> {
  public static async getInitialProps({ assets, data, renderPage }: any) {
    const page = await renderPage();
    return {
      assets,
      data,
      ...page
    };
  }

  public render() {
    const { helmet, assets, data, initialApolloState, css } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>After with Apollo !</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          <style id="jss-ssr">{css}</style>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(
                initialApolloState
              ).replace(/</g, "\\u003c")};`
            }}
          />
          <script
            type="text/javascript"
            src={assets.client.js}
            defer={true}
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}
