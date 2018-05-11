import FaceIcon from "@material-ui/icons/Face";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
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
import IconButton from "material-ui/IconButton";
import { Theme, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";

// tslint:disable-next-line:no-shadowed-variable
const styles = (theme: Theme) => ({
  avatar: {
    backgroundColor: green[500]
  },
  card: {
    maxWidth: 400
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
  stars: number;
  availableSeat: number;
}

export class WorkshopCard extends Component<IWorkshopCardProps, {}> {
  public static defaultProps = { avatar: <FaceIcon /> };

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
        <CardContent>tst</CardContent>
      </Card>
    );
  }
}

export default withStyles(styles as any)(WorkshopCard as any) as any;
