import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
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

interface IWindow extends Window {
  env: any;
}

declare var window: IWindow;

export class Payment extends React.Component<IPaymentProps, {}> {
  public async onToken(token) {
    const res = await fetch(window.env.STRIPE_API, {
      body: JSON.stringify({
        token,
        // tslint:disable-next-line:object-literal-sort-keys
        charge: {
          amount: 40,
          currency: "EUR"
        }
      }),
      method: "POST"
    });
    const data = await res.json();
  }

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
          valueProposition="Cuistot du Coin : Paiement"
        />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true}>
            <Typography
              variant="headline"
              align="center"
              component="h2"
              className={classes.tileTitle}
            >
              Paiement de l'atelier
            </Typography>
          </Grid>
          <Grid item={true} />
        </Grid>
        <Footer />
      </>
    );
  }
}

/*
            <StripeCheckout
              name="test"
              label="Paiement de l'atelier"
              token={this.onToken}
              amount={40}
              currency="EUR"
              stripeKey={window.env.STRIPE_API_KEY}
              allowRememberMe={false}
            />
*/

export default withStyles(styles as any)(Payment as any) as any;
