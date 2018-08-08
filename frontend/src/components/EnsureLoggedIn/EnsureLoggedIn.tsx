import { Auth } from "aws-amplify";
import withRedirect from "decorators/RedirectDecorator";
import React from "react";

interface IEnsureLoggedInProps {
  isLoggedIn: boolean;
  location: any;
  setReferer(url: string);
  redirectTo(url: string, push?: boolean);
  logIn();
}

export class EnsureLoggedIn extends React.Component<IEnsureLoggedInProps, {}> {
  public componentDidMount() {
    const { isLoggedIn, setReferer, location, redirectTo, logIn } = this.props;

    if (!isLoggedIn) {
      Auth.currentAuthenticatedUser()
        .then(user => console.log("Authenticated")) // Don't redirect to /login and delegate to App
        .catch(err => {
          setReferer(location.pathname);
          redirectTo("/login");
        });
    }
  }

  public render() {
    const { isLoggedIn, children } = this.props;

    if (isLoggedIn) {
      return children;
    }
    return null;
  }
}

export default withRedirect(EnsureLoggedIn) as any;
