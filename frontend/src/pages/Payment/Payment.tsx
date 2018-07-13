import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
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

interface IPaymentProps {
  classes?: any;
}

export class Payment extends React.Component<IPaymentProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Head
          title={metaInfo.metaInfo.payment.title}
          description={metaInfo.metaInfo.payment.description}
        />
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !"
        />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          hi!
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Payment as any) as any;
