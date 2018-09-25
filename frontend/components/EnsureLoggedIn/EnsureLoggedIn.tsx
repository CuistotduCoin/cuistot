import { Auth } from "aws-amplify";
import React from "react";
import { withRedirect } from "../../decorators/RedirectDecorator";

interface IEnsureLoggedInProps {
  isLoggedIn: boolean;
  location: any;
  setReferer(url: string);
  redirectTo(url: string, push?: boolean);
}

export class EnsureLoggedIn extends React.Component<IEnsureLoggedInProps, {}> {
  public componentDidMount() {
    const { isLoggedIn, setReferer, location, redirectTo } = this.props;

    const redirectToLogin = () => {
      setReferer(location.pathname);
      redirectTo("/login");
    };

    if (!isLoggedIn) {
      Auth.currentAuthenticatedUser()
        .then(user => {
          console.log(`Authenticated as ${user.username}`);
          if (user.username === "guest") {
            redirectToLogin();
          } // else delegate to App
        })
        .catch(err => redirectToLogin());
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
