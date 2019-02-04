import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import Layout from "../../components/Layout";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface IWorkingDayProps {
  classes?: any;
}

export class WorkingDay extends React.Component<IWorkingDayProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Layout valueProposition="Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !">
        <Grid
          container
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <div />
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(styles as any)(WorkingDay as any) as any;
