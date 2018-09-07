import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { AppContainer } from "components/App";
import { withRedirect } from "decorators/RedirectDecorator";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { Subscribe } from "unstated";
import * as Yup from "yup";

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
  username: ""
};

interface IResetPasswordRequestFormProps {
  classes?: any;
  redirectTo: any;
}

interface IResetPasswordRequestFormValues {
  username: string;
}

export class ResetPasswordRequestForm extends React.Component<
  IResetPasswordRequestFormProps,
  {}
> {
  public constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    const { classes } = this.props;

    const validationSchema = Yup.object().shape({
      username: Yup.string().required(
        "Vous devez indiquer votre nom d'utilisateur"
      )
    });

    const resetPasswordRequestFormComponent = () => (
      <Form autoComplete="off">
        <Grid container={true} className={classes.grid} spacing={16}>
          <Grid item={true} xs={12}>
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
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container={true} justify="center">
              <Button type="submit" variant="contained" color="secondary">
                Réinitialiser mon mot de passe
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
            initialValues={initialValues}
            component={resetPasswordRequestFormComponent}
            onSubmit={this.onSubmit(app.openSnackbar)}
            validationSchema={validationSchema}
          />
        )}
      </Subscribe>
    );
  }

  public onSubmit(openSnackbar) {
    return (
      values: IResetPasswordRequestFormValues,
      { setSubmitting, setErrors, setStatus, resetForm }
    ) => {
      Auth.forgotPassword(values.username)
        .then(data => {
          let successMessage;
          if (data.CodeDeliveryDetails) {
            successMessage =
              "Vous allez recevoir un mail qui vous permettra de réinitialiser votre mot de passe.";
          }
          if (successMessage) {
            setStatus({ success: true });
            resetForm(initialValues);
            this.props.redirectTo(
              `/password/reset?username=${values.username}`
            );
            openSnackbar(successMessage, "success");
          }
        })
        .catch(err => {
          let errorMessage;
          if (err.code === "UserNotFoundException") {
            errorMessage = "Aucun utilisateur n'est enregistré sous ce nom";
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
  ResetPasswordRequestForm
) as any) as any;
