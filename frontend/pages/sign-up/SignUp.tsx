import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Logo from "components/Logo";
import SignUpForm from "components/SignUpForm";
import Link from "next/link";
import React from "react";

const styles = (theme: Theme) => ({
  container: {
    textAlign: "center"
  },
  logo: {
    marginTop: 3 * theme.spacing.unit
  }
});

// tslint:disable-next-line
const SignUp: React.SFC<{ classes: any }> = ({ classes }) => (
  <div className={classes.container}>
    <Logo height={100} width={100} className={classes.logo} />
    <SignUpForm />
    <Typography align="center" gutterBottom={true}>
      Déjà membre ? <Link href="/login"><a>Connectez vous !</a></Link>
    </Typography>
  </div>
);

export default withStyles(styles as any)(SignUp as any) as any;
