import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Head from "components/Head";
import Logo from "components/Logo";
import SignUpForm from "components/SignUpForm";
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

interface ISignUpProps {
  classes?: any;
}

export class SignUp extends React.Component<ISignUpProps, {}> {
  public render() {
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
