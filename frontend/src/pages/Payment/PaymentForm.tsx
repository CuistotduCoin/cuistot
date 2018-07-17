import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

const styles = (theme: Theme) => ({
  "@global": {
    ".StripeElement": {
      boxShadow:
        "rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px",
      fontSize: 18,
      height: 20,
      margin: "10px 0",
      maxWidth: 600,
      minWidth: 360,
      outline: 0,
      padding: "10px 14px"
    },
    "input:focus, .StripeElement--focus": {
      boxShadow:
        "rgba(50, 50, 93, 0.109804) 0px 4px 6px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px",
      transition: "all 150ms ease"
    }
  }
});

interface IPaymentProps {
  classes?: any;
  stripe: any;
}

interface IPaymentState {
  complete: boolean;
}

export class PaymentForm extends React.Component<IPaymentProps, IPaymentState> {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  public async submit(ev) {
    const { token } = await this.props.stripe.createToken({ name: "Name" });
    console.log(token);
    const response = await axios({
      data: {
        body: token.id,
        headers: { "Content-Type": "application/json" }
      },
      method: "POST",
      url: "http://localhost:3000/charge"
    });

    if (response.status) this.setState({ complete: true });
  }

  public render() {
    if (this.state.complete) return <h1>Paiement effectué</h1>;

    const style = {
      base: {
        color: "#424770",
        fontFamily: "Roboto",
        fontSize: "18px",
        letterSpacing: "0.025em",
        padding: "5px"
      },
      invalid: {
        color: "#9e2146"
      }
    };

    return (
      <form onSubmit={this.submit}>
        <Grid container={true}>
          <CardElement style={style} />
        </Grid>
        <Grid container={true} justify="space-around">
          <Button variant="contained" color="primary">
            Valider le paiement
          </Button>
        </Grid>
      </form>
    );
  }
}

export default injectStripe(withStyles(styles as any)(
  PaymentForm as any
) as any) as any;
