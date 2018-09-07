import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { AppContainer } from "components/App";
import { withRedirect } from "decorators/RedirectDecorator";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { parse } from "query-string";
import React from "react";
import { withRouter } from "react-router-dom";
import { SNACKBAR_MESSAGES } from "shared/constants";
import { Subscribe } from "unstated";
import * as Yup from "yup";
import { PASSWORD_TEXT_HELPER } from '../../shared/constants';
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

interface IResetPasswordFormProps {
  classes?: any;
  redirectTo: any;
  location: any;
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
    this.initialValues = this.initialValues.bind(this);
  }

  public initialValues() {
    const params = parse(this.props.location.search);
    const username = params.username || "";
    return {
      username,
      code: "",
      newPassword: "",
      newPasswordConfirmation: ""
    };
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
                helperText={PASSWORD_TEXT_HELPER}
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
        {(app: any) => (
          <Formik
            initialValues={this.initialValues()}
            component={resetPasswordFormComponent}
            onSubmit={this.onSubmit(app.openSnackbar)}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
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
      const { username, code, newPassword } = values;
      Auth.forgotPasswordSubmit(username, code, newPassword)
        .then(data => {
          setStatus({ success: true });
          resetForm(this.initialValues());
          openSnackbar("Mot de passe mis à jour", "success");
          this.props.redirectTo(`/login`);
        })
        .catch(err => {
          openSnackbar(SNACKBAR_MESSAGES[err.code] || "Erreur", "error");
          setStatus({ success: false });
          setSubmitting(false);
          setErrors({ submit: err.message });
        });
    };
  }
}

export default withStyles(styles as any)(withRedirect(withRouter(
  ResetPasswordForm as any
) as any) as any);
