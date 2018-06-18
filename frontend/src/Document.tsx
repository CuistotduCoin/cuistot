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
      <html
        {...htmlAttrs}
        lang="fr"
        style={{
          height: "100%"
        }}
      >
        <head>
          <meta charSet="utf-8" />
          <title>Cuistot du Coin : des saveurs à partager</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta name="theme-color" content="#000000" />
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          <style id="jss-ssr">{css}</style>
          <link
            rel="shortcut icon"
            href="favicon/favicon.ico"
            type="image/x-icon"
          />
          <link rel="icon" href="favicon/favicon.png" type="image/png" />
          <link
            rel="icon"
            sizes="32x32"
            href="favicon/favicon-32.png"
            type="image/png"
          />
          <link
            rel="icon"
            sizes="64x64"
            href="favicon/favicon-64.png"
            type="image/png"
          />
          <link
            rel="icon"
            sizes="96x96"
            href="favicon/favicon-96.png"
            type="image/png"
          />
          <link
            rel="icon"
            sizes="96x96"
            href="favicon/favicon-144.png"
            type="image/png"
          />
          <link
            rel="icon"
            sizes="96x96"
            href="favicon/favicon-196.png"
            type="image/png"
          />
          <link
            rel="shortcut icon"
            href="favicon/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="favicon/apple-touch-icon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="favicon/apple-touch-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="favicon/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="favicon/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="favicon/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="favicon/apple-touch-icon-144x144.png"
          />
          <link
            rel="icon"
            sizes="196x196"
            href="favicon/favicon-196.png"
            type="image/png"
          />
          <meta
            name="msapplication-TileImage"
            content="favicon/favicon-144.png"
          />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <link
            rel="icon"
            href="favicon/animated_favicon.gif"
            type="image/gif"
          />
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
