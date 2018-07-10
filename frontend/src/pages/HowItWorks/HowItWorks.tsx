import * as content from "!raw-loader!content/howitworks.md";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
// @ts-ignore
import MarkdownElement from "@material-ui/docs/MarkdownElement";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import React from "react";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface IHowItWorksProps {
  classes?: any;
}

export class HowItWorks extends React.Component<IHowItWorksProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Head
          title={metaInfo.metaInfo.howitworks.title}
          description={metaInfo.metaInfo.howitworks.description}
        />
        <Header />
        <Hero
          imageURL="http://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="http://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Comment ça marche ?"
        />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <MarkdownElement text={content} />
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(HowItWorks as any) as any;
