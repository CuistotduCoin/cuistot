import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import React from "react";
// @ts-ignore
import { Elements, StripeProvider } from "react-stripe-elements";
import scriptjs from "scriptjs";
import metaInfo from "shared/metaInfo";
import PaymentForm from "./PaymentForm";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface IPaymentProps {
  classes?: any;
  match: any;
}

interface IPaymentState {
  atelier: string;
  cuistot: string;
  date: string;
  lieu: string;
  montant: number;
  decode: boolean;
  stripe: any;
}

export class Payment extends React.Component<IPaymentProps, IPaymentState> {
  constructor(props) {
    super(props);

    let atelier = "";
    let cuistot = "";
    let date = "";
    let decode = false;
    let lieu = "";
    let montant = -1;

    if (this.isBase64(props.match.params.id)) {
      const aToB = window.atob(props.match.params.id);
      const arrayWorkshop = aToB.split("-");
      if (arrayWorkshop.length === 5) {
        atelier = arrayWorkshop[0];
        cuistot = arrayWorkshop[1];
        date = arrayWorkshop[2];
        lieu = arrayWorkshop[3];
        montant = parseInt(arrayWorkshop[4], 10);
        decode = true;
      }
    }

    this.state = {
      atelier,
      cuistot,
      date,
      decode,
      lieu,
      montant,
      stripe: null
    };
  }

  public componentDidMount() {
    scriptjs("https://js.stripe.com/v3/", () => {
      this.setState({ stripe: window.Stripe(window.env.STRIPE_API_KEY) });
    });
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
        {this.state.decode ? (
          <Grid
            container={true}
            justify="space-around"
            alignItems="center"
            direction="column"
            spacing={16}
            className={classes.grid}
          >
            <Grid item={true}>
              <Typography variant="headline" align="center" component="h2">
                Paiement de l'atelier de {this.state.cuistot}, le{" "}
                {this.state.date}, pour l'atelier {this.state.atelier}, à{" "}
                {this.state.lieu}, pour un total de {this.state.montant}€
              </Typography>
            </Grid>
            <Grid item={true}>
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <PaymentForm />
                </Elements>
              </StripeProvider>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container={true}
            justify="space-around"
            alignItems="center"
            direction="column"
            spacing={16}
            className={classes.grid}
          >
            <Grid item={true}>
              <Typography variant="headline" align="center" component="h2">
                Erreur dans le lien de paiement
              </Typography>
            </Grid>
          </Grid>
        )}
        <Footer />
      </>
    );
  }

  private isBase64(str) {
    const notBase64 = /[^A-Z0-9+\/=]/i;

    const len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str)) {
      return false;
    }
    const firstPaddingChar = str.indexOf("=");
    return (
      firstPaddingChar === -1 ||
      firstPaddingChar === len - 1 ||
      (firstPaddingChar === len - 2 && str[len - 1] === "=")
    );
  }
}

export default withStyles(styles as any)(Payment as any) as any;
