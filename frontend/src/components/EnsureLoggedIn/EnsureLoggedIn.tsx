import withRedirect from "decorators/RedirectDecorator";
import React from "react";

interface IEnsureLoggedInProps {
  isLoggedIn: boolean;
  location: any;
  setRedirectUrl(url: string);
  redirectTo(url: string, push?: boolean);
}

export class EnsureLoggedIn extends React.Component<IEnsureLoggedInProps, {}> {
  public componentDidMount() {
    const { isLoggedIn, setRedirectUrl, location, redirectTo } = this.props;

    if (!isLoggedIn) {
      setRedirectUrl(location.pathname);
      redirectTo("/login");
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
