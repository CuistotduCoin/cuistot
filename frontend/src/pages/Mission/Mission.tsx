import * as content from "!raw-loader!content/mission.md";
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

interface IMissionProps {
  classes?: any;
}

export class Mission extends React.Component<IMissionProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Head
          title={metaInfo.metaInfo.mission.title}
          description={metaInfo.metaInfo.mission.description}
        />
        <Header />
        <Hero
          imageURL="https://picsum.photos/100/50/?random"
          videoURL="video/landing-video.mp4"
          valueProposition="Nos mission à Cuistot du Coin"
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

export default withStyles(styles as any)(Mission as any) as any;
