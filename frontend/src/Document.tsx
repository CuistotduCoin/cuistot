import { AfterData, AfterRoot } from "@jaredpalmer/after";
import { MuiThemeProvider } from "@material-ui/core";
import { createGenerateClassName } from "@material-ui/core/styles";
import React from "react";
import { JssProvider, SheetsRegistry } from "react-jss";
import serialize from "serialize-javascript";
import theme from "theme";
import { runtimeConfig } from "./config";

export interface IDocumentProps {
  helmet: any;
  assets: any;
  data: any;
  appInitialState: any;
  css: any;
}

export default class Document extends React.Component<IDocumentProps, {}> {
  public static async getInitialProps({ assets, data, renderPage }: any) {
    const sheets = new SheetsRegistry();
    const generateClassName = createGenerateClassName({
      productionPrefix: "c"
    });

    // tslint:disable-next-line:variable-name
    const page = await renderPage(After => props => (
      <JssProvider registry={sheets} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <After {...props} />
        </MuiThemeProvider>
      </JssProvider>
    ));
    return { assets, data, sheets, ...page };
  }

  public render() {
    const { helmet, assets, data, appInitialState, css } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html
        {...htmlAttrs}
        lang="fr"
        style={{
          height: "100vh"
        }}
      >
        <head>
          <meta charSet="utf-8" />
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
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(e,a,t,n,g,c,o){e.GoogleAnalyticsObject=g,e.ga=e.ga||function(){(e.ga.q=e.ga.q||[]).push(arguments)},e.ga.l=1*new Date,c=a.createElement(t),o=a.getElementsByTagName(t)[0],c.defer=1,c.src="https://www.google-analytics.com/analytics.js",o.parentNode.insertBefore(c,o)}(window,document,"script",0,"ga"),ga("create","UA-85934313-1","auto"),ga("send","pageview"),ga('set', 'anonymizeIp', true)`
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ltwAsyncInit = function(){init_multiplegl('https://gl.hostcg.com/',[['https://gl.hostcg.com/','2346','svolxbjcwm']]);};`
            }}
          />
          <script src="https://gl.hostcg.com/js/genlead.js" defer={true} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="9be7ee4d-531c-4885-90c7-2a190c06a0cc";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1669074413375602');fbq('track', 'PageView');`
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `_linkedin_partner_id = "419348"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(){var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})();`
            }}
          />
        </head>
        <body
          {...bodyAttrs}
          style={{
            minHeight: "100vh",
            overflowX: "hidden"
          }}
        >
          <script
            dangerouslySetInnerHTML={{
              __html: `window.env=${serialize(runtimeConfig)};`
            }}
          />
          <AfterRoot />
          <AfterData data={data} />
          {process.env.NODE_ENV === "production" && (
            <script src={assets.client.js} defer={true} />
          )}
          {process.env.NODE_ENV !== "production" && (
            <script
              src={assets.client.js}
              defer={true}
              crossOrigin="anonymous"
            />
          )}
        </body>
      </html>
    );
  }
}
