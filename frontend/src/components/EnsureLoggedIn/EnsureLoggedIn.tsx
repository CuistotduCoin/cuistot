import { Auth } from "aws-amplify";
import withRedirect from "decorators/RedirectDecorator";
import React from "react";

interface IEnsureLoggedInProps {
  isLoggedIn: boolean;
  location: any;
  setRedirectUrl(url: string);
  redirectTo(url: string, push?: boolean);
  logIn();
}

export class EnsureLoggedIn extends React.Component<IEnsureLoggedInProps, {}> {
  public componentDidMount() {
    const {
      isLoggedIn,
      setRedirectUrl,
      location,
      redirectTo,
      logIn
    } = this.props;

    if (!isLoggedIn) {
      setRedirectUrl(location.pathname);
      Auth.currentAuthenticatedUser()
        .then(user => {
          console.log("registered : ", user);
          logIn();
        })
        .catch(err => {
          console.log("not registered : ", err);
          redirectTo("/login");
        });
    }
  }

  public render() {
    const { isLoggedIn, children } = this.props;

    if (isLoggedIn) {
      console.log("access granted");
      return children;
    }
    console.log("access refused");
    return null;
  }
}

export default withRedirect(EnsureLoggedIn) as any;
