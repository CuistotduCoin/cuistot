import DateRange from "@material-ui/icons/DateRange";
import Face from "@material-ui/icons/Face";
import Favorite from "@material-ui/icons/Favorite";
import PersonPinCircle from "@material-ui/icons/PersonPinCircle";
import Place from "@material-ui/icons/Place";
import Share from "@material-ui/icons/Share";
import Theaters from "@material-ui/icons/Theaters";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Card, {
  CardActions,
  CardContent,
  CardHeader,
  CardMedia
} from "material-ui/Card";
import Chip from "material-ui/Chip";
import green from "material-ui/colors/green";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import { Theme, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating";

const styles = (theme: Theme) => ({
  avatar: {
    backgroundColor: green[500]
  },
  card: {
    width: 400
  },
  cardContent: {
    "&:last-child": { padding: 0 },
    padding: 0
  },
  cardHeaderDown: {
    background: "rgba(0, 0, 0, 0.2)",
    height: 40,
    marginTop: -72
  },
  cardHeaderUp: {
    alignItems: "flex-end",
    flexDirection: "row-reverse",
    marginBottom: -64
  },
  chip: {
    marginRight: 0
  },
  media: {
    height: 194
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.70)"
  },
  title: {
    color: "white"
  }
});

export interface IWorkshopCardProps {
  classes?: any;
  price: number;
  title: string;
  date: string;
  image: string;
  avatar: string;
  rating: number;
  availableSeat: number;
  spot: string;
  totalSeat: number;
  totalDate: number;
}

export class WorkshopCard extends Component<IWorkshopCardProps, {}> {
  public static defaultProps = { avatar: <Face /> };

  public render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeaderUp}
          avatar={<Chip label={this.props.price + "€"} />}
          classes={{ avatar: classes.chip }}
        />
        <CardMedia
          className={classes.media}
          image={this.props.image}
          title={this.props.title}
        />
        <CardHeader
          className={classes.cardHeaderDown}
          avatar={
            <Avatar className={classes.avatar}>{this.props.avatar}</Avatar>
          }
          title={this.props.title}
          subheader={this.props.date}
          classes={{
            subheader: classes.subtitle,
            title: classes.title
          }}
        />
        <CardContent className={classes.cardContent}>
          <Grid container={true}>
            <Grid item={true} xs={4}>
              <Grid container={true} justify="flex-start">
                <Place />
                <Typography variant="body1">{this.props.spot}</Typography>
              </Grid>
            </Grid>
            <Grid item={true} xs={4}>
              <Grid container={true} justify="center">
                <Theaters />
                <Typography variant="body1">
                  {this.props.availableSeat} places
                </Typography>
              </Grid>
            </Grid>
            <Grid item={true} xs={4}>
              <Grid container={true} justify="flex-end">
                <DateRange />
                <Typography variant="body1">
                  {this.props.totalDate} dates
                </Typography>
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true} justify="center">
                <StarRating rating={this.props.rating} />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles as any)(WorkshopCard as any) as any;
