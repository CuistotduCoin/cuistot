import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Face from "@material-ui/icons/Face";
import Place from "@material-ui/icons/Place";
import Theaters from "@material-ui/icons/Theaters";
import React from "react";
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
    background: "rgba(0, 0, 0, 0.4)",
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
  name: {
    color: "white"
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)"
  },
  title: {
    color: "white"
  }
});

export interface IWorkshopCardProps {
  classes?: any;
  price: number;
  name: string;
  date: string;
  image: string;
  imageCook: string;
  nameCook: string;
  rating?: number;
  availableSeat: number;
  spot: string;
  totalSeat: number;
  totalDate?: number;
}

export class WorkshopCard extends React.Component<IWorkshopCardProps, {}> {
  public static defaultProps = { avatar: <Face /> };

  public render() {
    const { classes } = this.props;

    let avatar;
    if (this.props.imageCook) {
      avatar = (
        <Avatar
          className={classes.avatar}
          alt={this.props.nameCook}
          src={this.props.imageCook}
        />
      );
    } else {
      avatar = (
        <Avatar className={classes.avatar}>
          {this.props.nameCook.charAt(0)}
        </Avatar>
      );
    }

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
          title={this.props.name}
        />
        <CardHeader
          className={classes.cardHeaderDown}
          avatar={avatar}
          title={this.props.name}
          subheader={this.props.date}
          classes={{
            subheader: classes.subtitle,
            title: classes.title
          }}
        />
        <CardContent className={classes.cardContent}>
          <Grid container={true}>
            <Grid item={true} xs={6}>
              <Grid container={true} justify="center">
                <Place />
                <Typography variant="body1">{this.props.spot}</Typography>
              </Grid>
            </Grid>
            <Grid item={true} xs={6}>
              <Grid container={true} justify="center">
                <Theaters />
                <Typography variant="body1">
                  {this.props.availableSeat} place{this.props.availableSeat >
                    1 && "s"}
                </Typography>
              </Grid>
            </Grid>
            {this.props.rating && (
              <Grid item={true} xs={12}>
                <Grid container={true} justify="center">
                  <StarRating rating={this.props.rating} />
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles as any)(WorkshopCard as any) as any;
