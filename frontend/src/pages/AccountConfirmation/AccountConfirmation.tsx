import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccountConfirmationForm from "components/AccountConfirmationForm";
import Head from "components/Head";
import Logo from "components/Logo";
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

// tslint:disable-next-line
const AccountConfirmation: React.SFC<{ classes: any }> = ({ classes }) => (
  <div className={classes.container}>
    <Head
      title={metaInfo.metaInfo.accountConfirmation.title}
      description={metaInfo.metaInfo.accountConfirmation.description}
    />
    <Logo height={100} width={100} className={classes.logo} />
    <Typography align="center" variant="display1">
      Vous avez dû recevoir un code de sécurité
    </Typography>
    <AccountConfirmationForm />
  </div>
);

export default withStyles(styles as any)(AccountConfirmation as any) as any;
