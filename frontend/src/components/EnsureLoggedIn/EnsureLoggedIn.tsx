import { Auth } from "aws-amplify";
import Loading from "components/Loading";
import { withRedirect } from "decorators/RedirectDecorator";
import React from "react";

interface IEnsureLoggedInProps {
  isLoggedIn: boolean;
  location: any;
  currentGourmet?: object;
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
    const { isLoggedIn, children, currentGourmet } = this.props;

    if (isLoggedIn) {
      if (!currentGourmet) {
        return <Loading />;
      }

      return children;
    }

    return null;
  }
}

export default withRedirect(EnsureLoggedIn) as any;
