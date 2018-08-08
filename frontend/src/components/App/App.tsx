import { Auth } from "aws-amplify";
import EnsureLoggedIn from "components/EnsureLoggedIn";
import Snackbar from "components/Snackbar";
import withRedirect from "decorators/RedirectDecorator";
import Business from "pages/Business/Business";
import Cook from "pages/Cook";
import Gift from "pages/Gift";
import GroupLesson from "pages/GroupLesson";
import Home from "pages/Home";
import HowItWorks from "pages/HowItWorks";
import Individual from "pages/Individual";
import Invite from "pages/Invite";
import InviteBusiness from "pages/InviteBusiness";
import Join from "pages/Join";
import Login from "pages/Login";
import Mission from "pages/Mission";
import NotFound from "pages/NotFound";
import Organize from "pages/Organize";
import Presskit from "pages/Presskit";
import Profil from "pages/Profil";
import ResetPassword from "pages/ResetPassword";
import ResetPasswordRequest from "pages/ResetPasswordRequest";
import Search from "pages/Search";
import SignUp from "pages/SignUp";
import Team from "pages/Team";
import Terms from "pages/Terms";
import TermsPro from "pages/TermsPro";
import Testimony from "pages/Testimony";
import Workshop from "pages/Workshop";
import React from "react";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";
import { Subscribe } from "unstated";
import { AppContainer } from ".";

interface IAppProps {
  location: any;
  referer?: string;
  isLoggedIn: boolean;
  redirectTo(url: string, push?: boolean);
  openSnackbar(message: string, variant: string);
  logIn();
  setReferer(url?: string);
}

export class App extends React.Component<IAppProps, {}> {
  public componentDidMount() {
    const { setReferer, logIn, isLoggedIn, location } = this.props;

    // When EnsureLoggedIn has been called before and has redirect to login,
    // the location pathname has not been updated yet here

    if (!isLoggedIn) {
      Auth.currentAuthenticatedUser()
        .then(user => {
          if (
            location.pathname !== "/login" &&
            location.pathname !== "/signup"
          ) {
            setReferer(undefined);
          }
          logIn();
        })
        .catch(err => console.log("Not authenticated"));
    }
  }

  public componentDidUpdate(prevProps) {
    const { referer, redirectTo, openSnackbar, isLoggedIn, logIn } = this.props;

    const isLoggingOut = prevProps.isLoggedIn && !isLoggedIn;
    const isLoggingIn = !prevProps.isLoggedIn && isLoggedIn;

    console.log("is logging in : ", isLoggingIn);
    console.log("is logging out : ", isLoggingOut);

    if (isLoggingIn && referer) {
      redirectTo(referer);
    } else if (isLoggingOut) {
      Auth.signOut()
        .then(data => {
          openSnackbar("Vous êtes maintenant déconnecté", "success");
          redirectTo("/");
        })
        .catch(err => {
          openSnackbar(`La déconnexion a échouée : ${err.message}`, "error");
          logIn();
        });
    }
  }

  public render() {
    return (
      <Subscribe to={[AppContainer]}>
        {(app: any) => (
          <>
            <Snackbar
              open={app.state.snackbarOpened}
              variant={app.state.snackbarVariant}
              onClose={app.closeSnackbar}
              message={app.state.snackbarMessage}
            />
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <Route
                path="/password/reset/request"
                exact
                component={ResetPasswordRequest}
              />
              <Route path="/password/reset" exact component={ResetPassword} />
              <Route path="/" exact component={Home} />
              <Route path="/terms" exact component={Terms} />
              <Route path="/terms-pro" exact component={TermsPro} />
              <Route path="/testimony" exact component={Testimony} />
              <Route path="/join" exact component={Join} />
              <Route path="/invite" exact component={Invite} />
              <Route path="/invite-business" exact component={InviteBusiness} />
              <Route path="/individual" exact component={Individual} />
              <Route path="/gift" exact component={Gift} />
              <Route path="/how-it-works" exact component={HowItWorks} />
              <Route path="/business" exact component={Business} />
              <Route path="/cook/:id" exact component={Cook} />
              <Route path="/group-lesson" exact component={GroupLesson} />
              <Route path="/mission" exact component={Mission} />
              <Route path="/organize" exact component={Organize} />
              <Route path="/presskit" exact component={Presskit} />
              <Route path="/profil/:id" exact component={Profil} />
              <Route path="/search" exact component={Search} />
              <Route path="/workshop/:id" exact component={Workshop} />
              <EnsureLoggedIn
                isLoggedIn={app.state.isLoggedIn}
                setReferer={app.setReferer}
              >
                <Switch>
                  <Route path="/team" exact component={Team} />
                  <Route component={NotFound} />
                </Switch>
              </EnsureLoggedIn>
            </Switch>
          </>
        )}
      </Subscribe>
    );
  }
}

export default withRouter(withRedirect(App as any) as any) as any;
