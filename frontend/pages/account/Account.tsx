import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { compose } from "recompose";
import AccountForm from "../../components/AccountForm";
import Header from "../../components/Header";
import { withAuth } from '../../decorators/WithAuth';

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

const enhance = compose(
  withStyles(styles as any),
  withAuth,
)

export default enhance(Account);
