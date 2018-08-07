import { Container } from "unstated";

interface IAppState {
  redirectUrl: string;
  openSnackbar: boolean;
  isLoggedIn: boolean;
  snackbarMessage?: string;
  snackbarVariant?: string;
}

class AppContainer extends Container<IAppState> {
  public state = {
    openSnackbar: false,
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
      openSnackbar: true,
      snackbarMessage: message,
      snackbarVariant: variant
    });
  };

  public closeSnackbar = () => {
    this.setState({
      openSnackbar: false
    });
  };
}

export default AppContainer;
