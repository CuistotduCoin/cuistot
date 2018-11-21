import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { compose } from "recompose";
import Layout from "../../components/Layout";
import WorkshopEditForm from "../../components/WorkshopEditForm";
import { withAuth, withData } from '../../decorators';

const styles = () => ({
  container: {
    textAlign: "center"
  }
});

interface IWorkshopEditProps {
  classes: any;
  workshopId: string;
}

// tslint:disable-next-line
export class WorkshopEdit extends React.Component<IWorkshopEditProps> {
  public static async getInitialProps({ query: { id }}) {
    return { workshopId: id };
  }

  public render() {
    const { classes, workshopId } = this.props;
    return (
      <Layout className={classes.container}>
        <WorkshopEditForm workshopId={workshopId} />
      </Layout>
    );
  }
}

const enhance = compose(
  withData,
  // withAuth,
  withStyles(styles as any),
);

export default enhance(WorkshopEdit);
