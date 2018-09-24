import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import components from "../../content/components";
// @ts-ignore
import Content from "../../content/join.mdx";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface IJoinProps {
  classes?: any;
}

export class Join extends React.Component<IJoinProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Rejoingnez l'équipe de Cuistot du Coin"
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

export default withStyles(styles as any)(Join as any) as any;
