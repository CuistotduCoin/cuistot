import React from "react";
import { Provider } from "unstated";
import { AppContainer } from ".";

export class ProvidedApp extends React.Component {
  public appContainer: any;

  public constructor(props) {
    super(props);
    this.appContainer = new AppContainer();
  }

  public render() {
    const { children } = this.props;
    return (
      <Provider inject={[this.appContainer]}>
        {children}
      </Provider>
    );
  }
}

export default ProvidedApp as any;
