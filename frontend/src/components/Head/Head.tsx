import React from "react";
import Helmet from "react-helmet";

export interface IHeadProps {
  title: string;
  description: string;
  image?: string;
  children?: any;
}

export class Head extends React.Component<IHeadProps, {}> {
  public render() {
    const { title, description, image, children } = this.props;

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={
            image
              ? image
              : "http://static.cuistotducoin.com/favicon/apple-touch-icon-114x114.png"
          }
        />
        <meta
          name="og:image"
          content={
            image
              ? image
              : "http://static.cuistotducoin.com/favicon/apple-touch-icon-114x114.png"
          }
        />
        {children}
      </Helmet>
    );
  }
}

export default (Head as any) as any;
