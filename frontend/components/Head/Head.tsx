import NextSeo from "next-seo";
import React from "react";

export interface IHeadProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  children?: any;
}

export class Head extends React.Component<IHeadProps, {}> {
  public render() {
    const { title, description, image, children, href } = this.props;

    console.log(this.props);

    return (
      <div /> /*
      <NextSeo
        config={{
          canonical: { href },
          description: { description },
          openGraph: {
            description: { description },
            images: [
              {
                url: { image }
              }
            ],
            title: { title },
            url: { href }
          },
          title: { title }
        }}
      >
        {children}
      </NextSeo>*/
    );
  }
}

export default (Head as any) as any;
