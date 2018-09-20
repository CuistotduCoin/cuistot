import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import components from "../../content/components";
// @ts-ignore
import Content from "../../content/testimony.mdx";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface ITestimonyProps {
  classes?: any;
}

export class Testimony extends React.Component<ITestimonyProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Ils nous font confiance"
        />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Content components={components} />
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Testimony as any) as any;
