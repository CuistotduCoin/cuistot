import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import components from "../../content/components";
// @ts-ignore
import Content from "../../content/presskit.mdx";
import metaInfo from "../../shared/metaInfo";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface IPresskitProps {
  classes?: any;
}

export class Presskit extends React.Component<IPresskitProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Head
          title={metaInfo.metaInfo.presskit.title}
          description={metaInfo.metaInfo.presskit.description}
        />
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Presskit"
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

export default withStyles(styles as any)(Presskit as any) as any;
