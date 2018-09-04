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
              referer={app.state.referer}
              openSnackbar={app.openSnackbar}
              isLoggedIn={app.state.isLoggedIn}
              logIn={app.logIn}
              setReferer={app.setReferer}
            />
          )}
        </Subscribe>
      </Provider>
    );
  }
}

export default ProvidedApp as any;