import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import green from "@material-ui/core/colors/green";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Face from "@material-ui/icons/Face";
import HourglassFull from "@material-ui/icons/HourglassFull";
import Place from "@material-ui/icons/Place";
import React from "react";
import StarRating from "../StarRating";

const styles = (theme: Theme) => ({
  avatar: {
    backgroundColor: green[500],
    border: "4px solid white",
    height: 60,
    width: 60
  },
  bottomContentCard: {
    marginTop: -40
  },
  bottomContentCardItem: {
    padding: 4
  },
  card: {
    width: 360
  },
  cardContent: {
    "&:last-child": { padding: 0 },
    marginTop: -25,
    padding: 0
  },
  cardHeaderUp: {
    alignItems: "flex-end",
    flexDirection: "row-reverse",
    marginBottom: -64
  },
  chip: {
    marginRight: 0
  },
  icon: {
    color: green[900],
    height: 15
  },
  link: {
    textDecoration: "none"
  },
  media: {
    height: 194
  },
  nameCook: {
    color: "white",
    marginTop: 5,
    textShadow: "1px 1px #585A5A"
  },
  ratingNumber: {
    color: "white",
    textShadow: "1px 1px #585A5A"
  }
});

export interface IWorkshopCardProps {
  classes?: any;
  price: number;
  name: string;
  date: string;
  duration: number;
  image: string;
  imageCook: string;
  nameCook: string;
  rating?: number;
  ratingNumber?: number;
  availableSeat: number;
  spot: string;
  totalSeat: number;
  totalDate?: number;
  typeform: string;
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
      <a className={classes.link} href={this.props.typeform} target="_blank">
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeaderUp}
            avatar={<Chip label={`${this.props.price} €`} />}
            classes={{ avatar: classes.chip }}
          />
          <CardMedia
            className={classes.media}
            image={this.props.image}
            title={this.props.name}
          />
          <CardContent className={classes.cardContent}>
            <Grid container={true} justify="space-between">
              <Grid item={true}>
                <Grid container={true}>
                  <Grid item={true}>{avatar}</Grid>
                  <Grid item={true}>
                    <Typography className={classes.nameCook} variant="body1">
                      Rencontrez {this.props.nameCook}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {this.props.rating && (
                <Grid item={true}>
                  <Grid container={true} justify="flex-end">
                    <StarRating rating={this.props.rating} />
                    {this.props.ratingNumber && (
                      <Typography
                        variant="caption"
                        className={classes.ratingNumber}
                      >
                        ({this.props.ratingNumber})
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid
              container={true}
              alignItems="center"
              direction="column"
              className={classes.bottomContentCard}
            >
              <Grid item={true} className={classes.bottomContentCardItem}>
                <Chip label="Atelier collectif" className={classes.chip} />
              </Grid>
              <Grid item={true} className={classes.bottomContentCardItem}>
                <Typography align="center" variant="title">
                  {this.props.name}
                </Typography>
              </Grid>
              <Grid item={true} className={classes.bottomContentCardItem}>
                <Typography variant="subheading">{this.props.date}</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container={true}>
              <Grid item={true} xs={6}>
                <Grid container={true} justify="center">
                  <Place className={classes.icon} />
                  <Typography variant="caption">{this.props.spot}</Typography>
                </Grid>
              </Grid>
              <Grid item={true} xs={6}>
                <Grid container={true} justify="center">
                  <HourglassFull className={classes.icon} />
                  <Typography variant="caption">
                    {this.props.duration}h
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </a>
    );
  }
}

export default withStyles(styles as any)(WorkshopCard as any) as any;
