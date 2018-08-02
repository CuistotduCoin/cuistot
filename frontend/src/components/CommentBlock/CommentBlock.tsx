import { Avatar, Grid, Typography } from "@material-ui/core";
import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import { StarRating } from "../StarRating/StarRating";

const styles = (theme: Theme) => ({});

interface ICommentBlock {
  classes?: any;
  comment: string;
  date: string;
  name: string;
  picture: string;
  stars: number;
}

export class CommentBlock extends React.Component<ICommentBlock, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Grid container={true} spacing={16}>
          <Grid item={true}>
            <Grid container={true} spacing={16}>
              <Grid item={true}>
                <Avatar alt={this.props.name} src={this.props.picture} />
              </Grid>
              <Grid item={true}>
                <Typography variant="subheading" component="p">
                  {this.props.name}
                </Typography>
                <Typography variant="caption" component="p">
                  {this.props.date}
                </Typography>
              </Grid>
              <Grid item={true}>
                <StarRating rating={this.props.stars} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true}>
            <Typography paragraph={true}>{this.props.comment}</Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles as any)(CommentBlock as any) as any;
