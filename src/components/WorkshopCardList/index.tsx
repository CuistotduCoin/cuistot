import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
import { WorkshopCard, WorkshopCardProps } from '../WorkshopCard';

export interface WorkshopCardListProps {
    cards?: WorkshopCard;
    uid?: string;
}

export class WorkshopCardList extends Component<WorkshopCardListProps, {}> {

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
