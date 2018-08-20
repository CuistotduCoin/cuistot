import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Head from "components/Head";
import Logo from "components/Logo";
import ResetPasswordForm from "components/ResetPasswordForm";
import React from "react";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  container: {
    textAlign: "center"
  },
  logo: {
    margin: 3 * theme.spacing.unit
  }
});

interface IResetPasswordProps {
  classes?: any;
}

export class ResetPassword extends React.Component<IResetPasswordProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Head
          title={metaInfo.metaInfo.resetPassword.title}
          description={metaInfo.metaInfo.resetPassword.description}
        />
        <Logo height={100} width={100} className={classes.logo} />
        <Typography align="center" variant="display1">
          Un tout nouveau mot de passe
        </Typography>
        <ResetPasswordForm />
      </div>
    );
  }
}

export default withStyles(styles as any)(ResetPassword as any) as any;
