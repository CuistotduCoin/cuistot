import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
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
  amount: number;
  description: string;
  receipt_email: string;
  metadata: string[];
}

interface IWindow extends Window {
  STRIPE_API: any;
  STRIPE_API_KEY: any;
}

declare var window: IWindow;

export class Payment extends React.Component<IPaymentProps, {}> {
  public async onToken(token) {
    const res = await fetch(window.STRIPE_API, {
      body: JSON.stringify({
        token,
        // tslint:disable-next-line:object-literal-sort-keys
        charge: {
          amount: this.props.amount,
          currency: "eur"
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
          <StripeCheckout
            name={this.props.description}
            label="Paiement de l'atelier"
            token={this.onToken}
            amount={this.props.amount}
            currency="eur"
            stripeKey={window.STRIPE_API_KEY}
            allowRememberMe={false}
          />
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Payment as any) as any;
