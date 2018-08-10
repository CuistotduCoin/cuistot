import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Head from "components/Head";
import Logo from "components/Logo";
import ResetPasswordRequestForm from "components/ResetPasswordRequestForm";
import React from "react";
import { Link } from "react-router-dom";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  container: {
    textAlign: "center"
  },
  logo: {
    margin: 3 * theme.spacing.unit
  }
});

interface IResetPasswordRequestProps {
  classes?: any;
}

export class ResetPasswordRequest extends React.Component<
  IResetPasswordRequestProps,
  {}
> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Head
          title={metaInfo.metaInfo.resetPasswordRequest.title}
          description={metaInfo.metaInfo.resetPasswordRequest.description}
        />
        <Logo height={100} width={100} className={classes.logo} />
        <Typography align="center" variant="display1">
          Vous avez oublié votre mot de passe ?
        </Typography>
        <ResetPasswordRequestForm />
        <Typography align="center" gutterBottom={true}>
          <Link to="/login" className={classes.link}>
            Non c'est bon, je m'en rappelle en fait
          </Link>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles as any)(ResetPasswordRequest as any) as any;
