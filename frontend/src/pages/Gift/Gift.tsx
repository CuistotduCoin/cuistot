import * as content from "!raw-loader!content/gift.md";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
// @ts-ignore
import MarkdownElement from "@material-ui/docs/MarkdownElement";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import React, { Component } from "react";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface IGiftProps {
  classes?: any;
}

export class Gift extends React.Component<IGiftProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Head
          title={metaInfo.metaInfo.gift.title}
          description={metaInfo.metaInfo.gift.description}
        />
        <Header />
        <Hero
          imageURL="img/home/landing.jpg"
          videoURL="video/landing-video.mp4"
          valueProposition="Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !"
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

export default withStyles(styles as any)(Gift as any) as any;
