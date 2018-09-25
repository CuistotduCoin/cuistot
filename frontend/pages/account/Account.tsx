import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import AccountForm from "../../components/AccountForm";
import Header from "../../components/Header";

const styles = (theme: Theme) => ({
  container: {
    textAlign: "center"
  },
  logo: {
    margin: 3 * theme.spacing.unit
  }
});

// tslint:disable-next-line
const Account: React.SFC<{ classes: any }> = ({ classes }) => (
  <div className={classes.container}>
    <Header />
    <Typography align="center" variant="display1">
      Mon compte
    </Typography>
    <AccountForm />
  </div>
);

export default withStyles(styles as any)(Account as any) as any;
