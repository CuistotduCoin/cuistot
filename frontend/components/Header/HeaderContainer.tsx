import { AppContainer } from "../../components/App";
import React from "react";
import { Subscribe } from "unstated";
import Header from "./Header";

// tslint:disable-next-line
const HeaderContainer: React.SFC<{}> = props => (
  <Subscribe to={[AppContainer]}>
    {(app: any) => <Header {...props} isLoggedIn={app.state.isLoggedIn} />}
  </Subscribe>
);

export default HeaderContainer;
