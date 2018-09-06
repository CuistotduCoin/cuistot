import { API, Auth, graphqlOperation } from "aws-amplify";
import EnsureLoggedIn from "components/EnsureLoggedIn";
import Snackbar from "components/Snackbar";
import { runtimeConfig } from "config";
import { withRedirect } from "decorators/RedirectDecorator";
import Account from "pages/Account";
import AccountConfirmation from "pages/AccountConfirmation";
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
import Profile from "pages/Profile";
import ResetPassword from "pages/ResetPassword";
import ResetPasswordRequest from "pages/ResetPasswordRequest";
import Search from "pages/Search";
import SignUp from "pages/SignUp";
import Team from "pages/Team";
import Terms from "pages/Terms";
import TermsPro from "pages/TermsPro";
import Testimony from "pages/Testimony";
import Workshop from "pages/Workshop";
import { GetCurrentGourmet, UpdateGourmet } from "queries";
import React from "react";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";
import { Subscribe } from "unstated";
import { AppContainer } from ".";

interface IAppProps {
  location: any;
  referer?: string;
  isLoggedIn: boolean;
  currentGourmet?: object;
  redirectTo(url: string, push?: boolean);
  openSnackbar(message: string, variant: string);
  logIn();
  setReferer(url?: string);
  setCurrentGourmet(gourmet?: object);
}

export class App extends React.Component<IAppProps, {}> {
  public componentDidMount() {
    const { setReferer, logIn, isLoggedIn, location } = this.props;

    // When EnsureLoggedIn has been called before and has redirect to login,
    // the location pathname has not been updated yet here

    if (!isLoggedIn) {
      Auth.currentAuthenticatedUser()
        .then(user => {
          console.log(`Authenticated as ${user.username}`);
          if (user.username !== "guest") {
            if (
              location.pathname !== "/login" &&
              location.pathname !== "/signup"
            ) {
              setReferer(undefined);
            }
            logIn();
          }
        })
        .catch(() => {
          console.log("Not authenticated... Authentication as guest...");
          Auth.signIn(
            runtimeConfig.GUEST_USERNAME,
            runtimeConfig.GUEST_PASSWORD
          )
            .then(user => console.log("Authenticated as guest"))
            .catch(err => {
              console.log(
                `Authentication as guest has failed : ${err.message}`
              );
            });
        });
    }
  }

  public componentDidUpdate(prevProps) {
    const {
      referer,
      currentGourmet,
      redirectTo,
      openSnackbar,
      isLoggedIn,
      logIn,
      setCurrentGourmet
    } = this.props;

    const isLoggingOut = prevProps.isLoggedIn && !isLoggedIn;
    const isLoggingIn = !prevProps.isLoggedIn && isLoggedIn;

    if (isLoggingIn) {
      if (referer) {
        console.log(`Logging in... redirecting to ${referer}`);
        redirectTo(referer);
      }

      if (!currentGourmet) {
        // Already set if logout has failed...
        API.graphql(graphqlOperation(GetCurrentGourmet)).then(result => {
          if (result.data.getCurrentGourmet.message === "success") {
            const gourmet = result.data.getCurrentGourmet.gourmet;
            setCurrentGourmet(gourmet);

            if (!gourmet.identity_id) {
              Auth.currentSession().then(currentSession => {
                const jwtToken = currentSession.getIdToken().getJwtToken();
                const loginKey = `cognito-idp.${
                  runtimeConfig.AWS_REGION_IRELAND
                }.amazonaws.com/${runtimeConfig.AWS_USERPOOL_ID}`;

                AWS.config.credentials = new AWS.CognitoIdentityCredentials(
                  {
                    IdentityPoolId: runtimeConfig.AWS_IDENTITY_POOL_ID,
                    Logins: { [loginKey]: jwtToken }
                  },
                  { region: runtimeConfig.AWS_REGION_IRELAND }
                );

                // Save the gourmet identity id in our base
                API.graphql(
                  graphqlOperation(UpdateGourmet, {
                    gourmet: {
                      id: currentSession.getIdToken().payload.sub,
                      identity_id: AWS.config.credentials.identityId
                    }
                  })
                ).then(updateResult => {
                  if (updateResult.data.updateGourmet.message === "success") {
                    console.log("identity id has been populated");
                  } else {
                    console.error("failure while populating identity id");
                  }
                });
              });
            }
          }
        });
      }
    } else if (isLoggingOut) {
      console.log("Logging out...");
      Auth.signOut()
        .then(data => {
          setCurrentGourmet(undefined);
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
              <Route
                path="/account/confirmation"
                exact
                component={AccountConfirmation}
              />
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
              <Route path="/profile/:id" exact component={Profile} />
              <Route path="/workshop/:id" exact component={Workshop} />
              <Route path="/s/:name" exact component={Search} />
              <Route path="/team" exact component={Team} />
              <EnsureLoggedIn
                isLoggedIn={app.state.isLoggedIn}
                setReferer={app.setReferer}
              >
                <Switch>
                  <Route path="/account" exact component={Account} />
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
