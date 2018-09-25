import { AppContainer } from "components/App";
import React from "react";
import { Subscribe } from "unstated";
import WorkshopNew from "./WorkshopNew";

// tslint:disable-next-line
const WorkshopNewContainer: React.SFC<{}> = props => (
  <Subscribe to={[AppContainer]}>
    {(app: any) => (
      <WorkshopNew
        {...props}
        openSnackbar={app.openSnackbar}
        currentGourmet={app.state.currentGourmet}
      />
    )}
  </Subscribe>
);

export default WorkshopNewContainer;
