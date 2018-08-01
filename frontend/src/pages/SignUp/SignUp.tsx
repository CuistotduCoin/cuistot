import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import Logo from "components/Logo";
import SignUpForm from "components/SignUpForm";
import React from "react";
import { Link } from "react-router-dom";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  container: {
    "text-align": "center"
  },
  logo: {
    "margin-top": 3 * theme.spacing.unit
  }
});

interface ISignUpProps {
  classes?: any;
}

export class SignUp extends React.Component<ISignUpProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Head
          title={metaInfo.metaInfo.signUp.title}
          description={metaInfo.metaInfo.signUp.description}
        />
        <Logo height={100} width={100} className={classes.logo} />
        <SignUpForm />
        <Typography align="center" gutterBottom={true}>
          Déjà membre ? <Link to="/login">Connectez vous !</Link>
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles as any)(SignUp as any) as any;
