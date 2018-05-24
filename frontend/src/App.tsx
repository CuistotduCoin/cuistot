import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Business from "./pages/Business/Business";
import Cook from "./pages/Cook/Cook";
import Gift from "./pages/Gift/Gift";
import GroupLesson from "./pages/GroupLesson/GroupLesson";
import Home from "./pages/Home/Home";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Individual from "./pages/Individual/Individual";
import Invite from "./pages/Invite/Invite";
import Join from "./pages/Join/Join";
import Legal from "./pages/Legal/Legal";
import Login from "./pages/Login/Login";
import Mission from "./pages/Mission/Mission";
import NotFound from "./pages/NotFound/NotFound";
import Organize from "./pages/Organize/Organize";
import Presskit from "./pages/Presskit/Presskit";
import Profil from "./pages/Profil/Profil";
import Search from "./pages/Search/Search";
import SignUp from "./pages/SignUp/SignUp";
import Team from "./pages/Team/Team";
import Testimony from "./pages/Testimony/Testimony";
import Workshop from "./pages/Workshop/Workshop";

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
    <Route exact={true} path="/business" component={Business} />
    <Route exact={true} path="/cook/:id" component={Cook} />
    <Route exact={true} path="/gift" component={Gift} />
    <Route exact={true} path="/group-lesson" component={GroupLesson} />
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/how-it-works" component={HowItWorks} />
    <Route exact={true} path="/individual" component={Individual} />
    <Route exact={true} path="/invite" component={Invite} />
    <Route exact={true} path="/join" component={Join} />
    <Route exact={true} path="/legal" component={Legal} />
    <Route exact={true} path="/login" component={Login} />
    <Route exact={true} path="/mission" component={Mission} />
    <Route exact={true} path="/organize" component={Organize} />
    <Route exact={true} path="/presskit" component={Presskit} />
    <Route exact={true} path="/profil/:id" component={Profil} />
    <Route exact={true} path="/search" component={Search} />
    <Route exact={true} path="/sign-up" component={SignUp} />
    <Route exact={true} path="/team" component={Team} />
    <Route exact={true} path="/testimony" component={Testimony} />
    <Route exact={true} path="/workshop/:id" component={Workshop} />
    <Route component={NotFound} />
  </Switch>
);

export default withStyles(styles)(App);
