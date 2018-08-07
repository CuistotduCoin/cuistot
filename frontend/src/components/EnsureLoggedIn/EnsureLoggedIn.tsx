import withRedirect from "decorators/RedirectDecorator";
import React from "react";

interface IEnsureLoggedInProps {
  isLoggedIn: boolean;
  location: object;
  setRedirectUrl(url: string);
  redirectTo(url: string, push?: boolean);
}

export class EnsureLoggedIn extends React.Component<IEnsureLoggedInProps, {}> {
  public componentDidMount() {
    const { isLoggedIn, setRedirectUrl, location, redirectTo } = this.props;

    console.log("EnsureLoggedIn");

    if (!isLoggedIn) {
      console.log("location : ", location);
      setRedirectUrl(location.pathname);
      redirectTo("/login");
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

export default withRedirect(EnsureLoggedIn);
