import { FormControl } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { Field, Form, Formik } from "formik";
// @ts-ignore
import { TextField } from "formik-material-ui";
import React from "react";
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
  username: string;
  password: string;
}

export class LoginForm extends React.Component<ILoginForm, {}> {
  public render() {
    const { classes } = this.props;

    const validationSchema = Yup.object().shape({
      password: Yup.string()
        .min(8, "Votre mot de passe doit contenir au minimum 8 caractères")
        .matches(/[a-z]/, "Votre mot de passe doit contenir une minuscule")
        .matches(/[A-Z]/, "Votre mot de passe doit contenir une majuscule")
        .matches(/[0-9]/, "Votre mot de passe doit contenir un chiffre")
        .required("Un mot de passe est obligatoire"),
      username: Yup.string().required("Un nom d'utilisateur est obligatoire")
    });

    const onSubmit = (values: ILoginFormValues) => {
      Auth.signIn(values.username, values.password)
        .then(user => console.log(user))
        .catch(err => console.log(err));
    };

    const initialValues = {
      password: "",
      username: ""
    };

    const loginFormComponent = () => (
      <Form autoComplete="off">
        <FormControl>
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
                  id="username"
                  label="Nom d'utilisateur"
                  name="username"
                  placeholder="Votre nom d'utilisateur"
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
                <Button type="submit" variant="contained" color="secondary">
                  Se connecter
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
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
