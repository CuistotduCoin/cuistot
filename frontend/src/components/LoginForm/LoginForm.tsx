import { Formik } from "formik";
import { Theme, withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import React, { Component } from "react";

const styles = (theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

interface ILoginForm {
  classes?: any;
  firstName: string;
}

export class LoginForm extends Component<ILoginForm, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off">
        <TextField
          id="email"
          label="Email"
          placeholder="Votre Email"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          placeholder="Votre mot de passe"
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

export default withStyles(styles as any)(LoginForm as any) as any;
