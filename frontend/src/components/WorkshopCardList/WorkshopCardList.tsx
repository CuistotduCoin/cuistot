import Grid from "material-ui/Grid";
import React, { Component } from "react";
import WorkshopCard from "../WorkshopCard";

export interface IWorkshopCardListProps {
  uid?: string;
}

export class WorkshopCardList extends Component<IWorkshopCardListProps, {}> {
  public render() {
    return (
      <Grid container={true} justify="space-around">
        <Grid item={true} xs={12}>
          hi
        </Grid>
      </Grid>
    );
  }
}

export default (WorkshopCardList as any) as any;
