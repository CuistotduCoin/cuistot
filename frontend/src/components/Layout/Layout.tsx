import { AppContainer } from "components/App";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import React from "react";
import metaInfo from "shared/metaInfo";
import { Subscribe } from "unstated";

interface ILayoutProps {
  pageName?: string;
  valueProposition: string;
  description?: string;
  children: any;
}

export class Layout extends React.Component<ILayoutProps, {}> {
  public render() {
    const { pageName, valueProposition, description, children } = this.props;

    return (
      <>
        {pageName && (
          <Head
            title={metaInfo.metaInfo[pageName].title}
            description={metaInfo.metaInfo[pageName].description}
          />
        )}
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition={valueProposition}
          description={description}
        />
        {children}
        <Footer />
      </>
    );
  }
}

export default Layout as any;
