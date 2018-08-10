import { FormControl } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { FastField, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { fromString } from "shared/util";
import * as Yup from "yup";
// import { formatCardNumber, formatExpirationDate } from "./payment";
// import PaymentField from "./PaymentField";

const styles = (theme: Theme) => ({});

interface IPaymentCardFormProps {
  classes?: any;
}

interface IPaymentCardFormState {
  focused: CardField;
}

enum CardField {
  NUMBER = "number",
  NAME = "name",
  EXPIRY = "expiry",
  CVC = "cvc"
}

interface IPaymentCardFormValues {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

type CardFieldStr = "number" | "name" | "expiry" | "cvc";

export class PaymentCardForm extends React.Component<
  IPaymentCardFormProps,
  IPaymentCardFormState
> {
  public state: IPaymentCardFormState = {
    focused: CardField.NUMBER
  };

  private validationSchema = Yup.object().shape({
    cvc: Yup.number()
      .required("Le CVC est obligatoire")
      .positive(),
    expiry: Yup.number()
      .required("La date d'expiration est obligatoire")
      .positive(),
    name: Yup.string().required("Le nom est obligatoire"),
    number: Yup.number()
      .required("Le numéro de carte est obligatoire")
      .positive()
  });

  public handleInputFocus = (event: React.FormEvent<HTMLInputElement>) => {
    console.log("fdssf");
    const val: string = event.currentTarget.name;
    const field = fromString(CardField, val);
    this.setState({ focused: field });
  };

  public onSubmit = () => async (values: IPaymentCardFormValues) => {
    try {
      alert("Pay");
    } catch (e) {
      alert(e.message);
    }
  };

  public render() {
    const { classes } = this.props;

    const initialValues = {
      cvc: "",
      expiry: "",
      name: "",
      number: ""
    };

    const paymentCardFormComponent = (
      props: FormikProps<IPaymentCardFormValues>
    ) => (
      <Form autoComplete="off">
        <FormControl>
          <Grid container={true} justify="space-around" spacing={16}>
            <Grid item={true} xs={12}>
              <Grid container={true}>
                <Card
                  cvc={props.values.cvc || ""}
                  expiry={props.values.expiry || ""}
                  name={props.values.name || ""}
                  number={props.values.number || ""}
                  focused={this.state.focused.toString() as CardFieldStr}
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Divider />
            </Grid>
            <Grid item={true} xs={8}>
              <Grid container={true}>
                <FastField
                  type="text"
                  component={TextField}
                  id="number"
                  label="Numéro de carte"
                  name="number"
                  placeholder="Votre numero de carte"
                  className={classes.textField}
                  margin="normal"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.number}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={4}>
            <Grid container={true}>
              <FastField
                type="text"
                component={TextField}
                id="expiry"
                label="Expiration"
                name="expiry"
                placeholder="MM/AA"
                className={classes.textField}
                margin="normal"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.expiry}
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={8}>
            <Grid container={true}>
              <FastField
                type="text"
                component={TextField}
                id="name"
                label="Nom du porteur"
                name="name"
                placeholder="Votre nom"
                className={classes.textField}
                margin="normal"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={4}>
            <Grid container={true}>
              <FastField
                type="text"
                component={TextField}
                id="cvc"
                label="CVC"
                name="cvc"
                placeholder="CVC"
                className={classes.textField}
                margin="normal"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.cvc}
              />
            </Grid>
          </Grid>
          <div>{JSON.stringify(props, null, 2)}></div>
          <div>{JSON.stringify(this.state, null, 2)}></div>
        </FormControl>
      </Form>
    );

    return (
      <Formik
        initialValues={initialValues}
        component={paymentCardFormComponent}
        onSubmit={this.onSubmit}
        validationSchema={this.validationSchema}
        handleChange={this.handleInputFocus}
      />
    );
  }
}

export default withStyles(styles as any)(PaymentCardForm as any) as any;
