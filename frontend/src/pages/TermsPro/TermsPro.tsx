import * as content from "!raw-loader!content/terms-pro.md";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
// @ts-ignore
import MarkdownElement from "@material-ui/docs/MarkdownElement";
import Footer from "components/Footer";
import Header from "components/Header";
import Hero from "components/Hero";
import React from "react";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface ITermsProProps {
  classes?: any;
}

export class TermsPro extends React.Component<ITermsProProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Hero
          imageURL="http://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="http://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Conditions légales"
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

export default withStyles(styles as any)(TermsPro as any) as any;
