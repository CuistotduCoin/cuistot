import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Head from "components/Head";
import LoginForm from "components/LoginForm";
import Logo from "components/Logo";
import React from "react";
import { Link } from "react-router-dom";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  container: {
    textAlign: "center"
  },
  logo: {
    marginTop: 3 * theme.spacing.unit
  }
});

interface ILoginProps {
  classes?: any;
}

export class Login extends React.Component<ILoginProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Head
          title={metaInfo.metaInfo.login.title}
          description={metaInfo.metaInfo.login.description}
        />
        <Logo height={100} width={100} className={classes.logo} />
        <LoginForm />
        <Typography align="center" gutterBottom={true}>
          Pas encore membre ? <Link to="/signup">Inscrivez vous !</Link>
        </Typography>
        <Typography align="center" gutterBottom={true}>
          <Link to="/password/reset/request">
            Vous avez oublié votre mot de passe ?
          </Link>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles as any)(Login as any) as any;
