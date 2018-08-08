import { Auth } from "aws-amplify";
import EnsureLoggedIn from "components/EnsureLoggedIn";
import Snackbar from "components/Snackbar";
import withRedirect from "decorators/RedirectDecorator";
import Home from "pages/Home";
import Individual from "pages/Individual";
import Invite from "pages/Invite";
import InviteBusiness from "pages/InviteBusiness";
import Join from "pages/Join";
import Login from "pages/Login";
import ResetPassword from "pages/ResetPassword";
import ResetPasswordRequest from "pages/ResetPasswordRequest";
import SignUp from "pages/SignUp";
import Team from "pages/Team";
import Terms from "pages/Terms";
import TermsPro from "pages/TermsPro";
import Testimony from "pages/Testimony";
import React from "react";
import { Route, Switch } from "react-router";
import { Subscribe } from "unstated";
import { AppContainer } from ".";

interface IAppProps {
  redirectUrl: string;
  isLoggedIn: boolean;
  redirectTo(url: string, push?: boolean);
  openSnackbar(message: string, variant: string);
  logIn();
  setRedirectUrl(url: any);
}

export class App extends React.Component<IAppProps, {}> {
  public componentDidMount() {
    const { setRedirectUrl, logIn, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      Auth.currentAuthenticatedUser().then(user => {
        setRedirectUrl(null);
        logIn();
      });
    }
  }

  public componentDidUpdate(prevProps) {
    const {
      redirectUrl,
      redirectTo,
      openSnackbar,
      isLoggedIn,
      logIn
    } = this.props;

    const isLoggingOut = prevProps.isLoggedIn && !isLoggedIn;
    const isLoggingIn = !prevProps.isLoggedIn && isLoggedIn;

    console.log("is logging in : ", isLoggingIn);
    console.log("is logging out : ", isLoggingOut);

    if (isLoggingIn && redirectUrl) {
      redirectTo(redirectUrl);
    } else if (isLoggingOut) {
      Auth.signOut()
        .then(data => redirectTo("/"))
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
              <EnsureLoggedIn
                isLoggedIn={app.state.isLoggedIn}
                setRedirectUrl={app.setRedirectUrl}
              >
                <Switch>
                  <Route path="/team" exact component={Team} />
                </Switch>
              </EnsureLoggedIn>
            </Switch>
          </>
        )}
      </Subscribe>
    );
  }
}

export default withRedirect(App) as any;
