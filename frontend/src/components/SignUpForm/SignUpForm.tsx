import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import Snackbar from "components/Snackbar";
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

interface ISignUpForm {
  classes?: any;
}

interface ISignUpFormValues {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

interface ISignUpState {
  openSnackbar: boolean;
  snackbarMessage: string;
  snackbarVariant: string;
}

export class SignUpForm extends React.Component<ISignUpForm, ISignUpState> {
  public state = {
    openSnackbar: false,
    snackbarMessage: '',
    snackbarVariant: ''
  };

  public constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSnackbarClose = this.onSnackbarClose.bind(this);
  }

  public onSnackbarClose = () => {
    this.setState({ openSnackbar: false });
  };

  public render() {
    const { classes } = this.props;

    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Veuillez saisir une adresse email valide")
        .required("Une adresse email est obligatoire"),
      firstname: Yup.string().required("Un prénom est obligatoire"),
      lastname: Yup.string().required("Un nom est obligatoire"),
      password: Yup.string()
        .min(8, "Votre mot de passe doit contenir au minimum 8 caractères")
        .matches(/[a-z]/, "Votre mot de passe doit contenir une minuscule")
        .matches(/[A-Z]/, "Votre mot de passe doit contenir une majuscule")
        .matches(/[0-9]/, "Votre mot de passe doit contenir un chiffre")
        .required("Un mot de passe est obligatoire"),
      username: Yup.string().required("Un nom d'utilisateur est obligatoire")
    });

    const initialValues = {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      username: ""
    };

    const signUpFormComponent = () => (
      <>
        <Snackbar
          variant={this.state.snackbarVariant}
          open={this.state.openSnackbar}
          onClose={this.onSnackbarClose}
          message={this.state.snackbarMessage}
          hidable={this.state.snackbarVariant !== "success"}
        />
        <Form autoComplete="off">
          <Grid container={true} className={classes.grid} spacing={16}>
            <Grid item={true} xs={12}>
              <Grid container={true} justify="center">
                <Button variant="outlined" color="secondary">
                  S'inscrire avec Facebook
                </Button>
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Divider />
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true} spacing={16}>
                <Grid item={true} xs={6}>
                  <Field
                    id="firstname"
                    name="firstname"
                    label="Prénom"
                    placeholder="Votre prénom"
                    className={classes.textField}
                    margin="normal"
                    type="text"
                    component={TextField}
                  />
                </Grid>
                <Grid item={true} xs={6}>
                  <Field
                    id="lastname"
                    name="lastname"
                    label="Nom"
                    placeholder="Votre nom"
                    className={classes.textField}
                    margin="normal"
                    type="text"
                    component={TextField}
                  />
                </Grid>
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
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true} justify="center">
                <Button type="submit" variant="contained" color="secondary">
                  S'inscrire
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </>
    );

    return (
      <Formik
        initialValues={initialValues}
        component={signUpFormComponent}
        onSubmit={this.onSubmit}
        validationSchema={validationSchema}
      />
    );
  }

  public onSubmit(values: ISignUpFormValues) {
    Auth.signUp({
      attributes: {
        email: values.email,
        family_name: values.lastname,
        name: values.firstname
      },
      password: values.password,
      username: values.username
    })
      .then(data => {
        let resultMessage;
        if (data.userSub) {
          resultMessage = 'Votre compte a bien été créé. Vous allez recevoir un mail qui vous permettra de le confirmer.'
        }
        if (resultMessage) {
          this.setState({
            openSnackbar: true,
            snackbarMessage: resultMessage,
            snackbarVariant: 'success'
          });
        }
      })
      .catch(err => {
        let resultMessage;
        if (err.code === "UsernameExistsException") {
          resultMessage = "Ce nom d'utilisateur est déjà associé à un compte existant"
        }
        if (resultMessage) {
          this.setState({
            openSnackbar: true,
            snackbarMessage: resultMessage,
            snackbarVariant: 'warning',
          });
        }
      });
  }
}

export default withStyles(styles as any)(SignUpForm as any) as any;
