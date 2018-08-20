import { Container } from "unstated";

interface IAppState {
  referer?: string;
  isLoggedIn: boolean;
  snackbarOpened: boolean;
  snackbarMessage?: string;
  snackbarVariant?: string;
}

class AppContainer extends Container<IAppState> {
  public state = {
    snackbarOpened: false,
    isLoggedIn: false,
    referer: "/"
  };

  public setReferer = url => {
    this.setState({ referer: url });
  };

  public logIn = () => {
    this.setState({ isLoggedIn: true });
  };

  public logOut = () => {
    this.setState({ isLoggedIn: false, referer: "/" });
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
