import React from "react";
import { Provider, Subscribe } from "unstated";
import { App, AppContainer } from ".";

export class ProvidedApp extends React.Component {
  public appContainer: any;

  public constructor(props) {
    super(props);
    this.appContainer = new AppContainer();
  }

  public render() {
    return (
      <Provider inject={[this.appContainer]}>
        <Subscribe to={[AppContainer]}>
          {(app: any) => (
            <App
              redirectUrl={app.state.redirectUrl}
              openSnackbar={app.openSnackbar}
              isLoggedIn={app.state.isLoggedIn}
              logIn={app.logIn}
            />
          )}
        </Subscribe>
      </Provider>
    );
  }
}

export default ProvidedApp as any;
