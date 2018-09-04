import { withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import Hero from "components/Hero/Hero";
import React from "react";

const styles = () => ({});

interface ISearchProps {
  classes?: any;
  match: any;
}

export class Search extends React.Component<ISearchProps, {}> {
  public render() {
    return (
      <>
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition={
            "Ateliers de cuisine à " + this.props.match.params.name
          }
        />
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Search as any) as any;
