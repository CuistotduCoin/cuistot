import { withStyles } from "material-ui/styles";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";

const styles = (theme: any) => ({
  root: theme.mixins.gutters({
    margin: theme.spacing.unit * 3,
    paddingBottom: 16,
    paddingTop: 16
  })
});

// tslint:disable-next-line:variable-name
const App = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
  </Switch>
);

export default withStyles(styles)(App);
