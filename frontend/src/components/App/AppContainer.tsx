import { Container } from "unstated";

interface IAppState {
  redirectUrl: string;
  isLoggedIn: boolean;
  snackbarOpened: boolean;
  snackbarMessage?: string;
  snackbarVariant?: string;
}

class AppContainer extends Container<IAppState> {
  public state = {
    snackbarOpened: false,
    isLoggedIn: false,
    redirectUrl: "/"
  };

  public setRedirectUrl = redirectUrl => {
    this.setState({ redirectUrl });
  };

  public logIn = () => {
    this.setState({ isLoggedIn: true });
  };

  public logOut = () => {
    this.setState({ isLoggedIn: false });
  };

  public openSnackbar = (message, variant = "info") => {
    this.setState({
      snackbarOpened: true,
      snackbarMessage: message,
      snackbarVariant: variant
    });
  };

  public closeSnackbar = () => {
    this.setState({
      snackbarOpened: false
    });
  };
}

export default AppContainer;
