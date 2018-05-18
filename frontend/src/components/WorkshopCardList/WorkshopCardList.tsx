import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import WorkshopCard from "../WorkshopCard";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: "1080px"
  }
});

export interface IWorkshopCardListProps {
  classes?: any;
  workshops: any;
}

export class WorkshopCardList extends Component<IWorkshopCardListProps, {}> {
  public render() {
    const { classes, workshops } = this.props;
    console.log(this.props);

    return (
      <Grid
        container={true}
        justify="space-around"
        alignItems="center"
        spacing={16}
        className={classes.grid}
      >
        {workshops.map((workshop: any, idx: number) => (
          <Grid item={true} xs={12} md={6} lg={4}>
            <Grid container={true} justify="center">
              {workshop}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles as any)(WorkshopCardList as any) as any;
