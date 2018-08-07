import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { AppContainer } from "components/App";
import withRedirect from "decorators/RedirectDecorator";
import { Field, Form, Formik } from "formik";
// @ts-ignore
import { TextField } from "formik-material-ui";
import React from "react";
import { Subscribe } from "unstated";
import * as Yup from "yup";
import {
  passwordConfirmationValidation,
  passwordValidation
} from "../../shared/validations";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 540,
    padding: 24,
    paddingTop: 0
  },
  textField: {
    width: "100%"
  }
});

const initialValues = {
  username: "",
  code: "",
  newPassword: "",
  newPasswordConfirmation: ""
};

interface IResetPasswordFormProps {
  classes?: any;
  redirectTo: any;
}

interface IResetPasswordFormValues {
  username: string;
  code: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export class ResetPasswordForm extends React.Component<
  IResetPasswordFormProps,
  {}
> {
  public constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    const { classes } = this.props;

    const validationSchema = Yup.object().shape({
      username: Yup.string().required("Un nom d'utilisateur est obligatoire"),
      code: Yup.number().required("Veuillez entrer le code reçu par email"),
      newPassword: passwordValidation(),
      newPasswordConfirmation: passwordConfirmationValidation("newPassword")
    });

    const resetPasswordFormComponent = () => (
      <Form autoComplete="off">
        <Grid container={true} className={classes.grid} spacing={16}>
          <Grid item={true} xs={12}>
            <Grid container={true}>
              <Field
                type="text"
                component={TextField}
                id="username"
                label="Nom d'utilisateur"
                name="username"
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
                id="code"
                label="Code de sécurité"
                name="code"
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
                id="newPassword"
                label="Votre nouveau mot de passe"
                name="newPassword"
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
                id="newPasswordConfirmation"
                label="Confirmation de votre nouveau mot de passe"
                name="newPasswordConfirmation"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container={true} justify="center">
              <Button type="submit" variant="contained" color="secondary">
                Mettre à jour mon mot de passe
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    );

    return (
      <Subscribe to={[AppContainer]}>
        {app => (
          <Formik
            initialValues={initialValues}
            component={resetPasswordFormComponent}
            onSubmit={this.onSubmit(app.openSnackbar)}
            validationSchema={validationSchema}
          />
        )}
      </Subscribe>
    );
  }

  public onSubmit(openSnackbar) {
    return (
      values: IResetPasswordFormValues,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      Auth.forgotPasswordSubmit(
        values.username,
        values.code,
        values.newPassword
      )
        .then(data => {
          setStatus({ success: true });
          resetForm(initialValues);
          openSnackbar("Mot de passe mis à jour", "success");
          this.props.redirectTo(`/login`);
        })
        .catch(err => {
          let errorMessage;
          if (err.code === "CodeMismatchException") {
            errorMessage = "Le code de sécurité entré est incorrect";
          } else if (err.code === "ExpiredCodeException") {
            errorMessage =
              "Le code de sécurité a expiré. Veuillez faire une nouvelle demande.";
          }
          if (errorMessage) {
            openSnackbar(errorMessage, "error");
          }
          setStatus({ success: false });
          setSubmitting(false);
          setErrors({ submit: err.message });
        });
    };
  }
}

export default withStyles(styles as any)(withRedirect(
  ResetPasswordForm
) as any) as any;
