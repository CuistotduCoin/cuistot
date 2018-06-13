import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { Field, Form, Formik, FormikActions } from "formik";
// @ts-ignore
import { TextField } from "formik-material-ui";
import React, { Component } from "react";
import * as Yup from "yup";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 540,
    padding: 24
  },
  textField: {
    width: "100%"
  }
});

interface ILoginForm {
  classes?: any;
}

interface ILoginFormValues {
  email: string;
  password: string;
}

export class LoginForm extends Component<ILoginForm, {}> {
  public render() {
    const { classes } = this.props;

    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Veuillez saisir votre adresse email au bon format")
        .required("L'email est obligatoire"),
      password: Yup.string()
        .min(
          8,
          "Votre mot de passe contient 8 charactères avec minuscules, majuscules et chiffres"
        )
        .matches(/[a-z]/, "Votre mot de passe contient une minuscule")
        .matches(/[A-Z]/, "Votre mot de passe contient une majuscule")
        .matches(/[0-9]/, "Votre mot de passe contient un chiffre")
        .required("Le mot de passe est obligatoire")
    });

    const onSubmit = async (values: ILoginFormValues) => {
      try {
        await Auth.signIn(values.email, values.password);
        alert("Logged in");
      } catch (e) {
        alert(e.message);
      }
    };

    const initialValues = {
      email: "",
      password: ""
    };

    const loginFormComponent = () => (
      <Form autoComplete="off">
        <Grid container={true} className={classes.grid} spacing={16}>
          <Grid item={true} xs={12}>
            <Grid container={true} justify="center">
              <Button variant="outlined" color="secondary">
                Se connecter avec Facebook
              </Button>
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            <Divider />
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container={true}>
              <Field
                type="text"
                component={TextField}
                id="email"
                label="Email"
                name="email"
                placeholder="Votre email"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container={true}>
              <Field
                type="password"
                component={TextField}
                id="password"
                label="Mot de passe"
                name="password"
                placeholder="Votre mot de passe"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container={true} justify="center">
              <Button variant="contained" color="secondary">
                Se connecter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    );

    return (
      <Formik
        initialValues={initialValues}
        component={loginFormComponent}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      />
    );
  }
}

export default withStyles(styles as any)(LoginForm as any) as any;
