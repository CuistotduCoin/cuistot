import FavoriteIcon from "material-ui-icons/Favorite";
import ShareIcon from "material-ui-icons/Share";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Card, {
  CardActions,
  CardContent,
  CardHeader,
  CardMedia
} from "material-ui/Card";
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
  media: {
    height: 194
  }
});

export interface IWorkshopCardProps {
  classes?: any;
}

export class WorkshopCard extends Component<IWorkshopCardProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/400/194/?random"
          title="Atelier Takako"
        />
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} aria-label="Recipe">
              R
            </Avatar>
          }
          title="Atelier Sushis, Makis et Témaris"
          subheader="Samedi 19 Juin 2018, de 14h à 18h"
        />
        <CardContent>
          <Typography component="p">
            Découvrez la cuisine japonaise et apprennez des recettes
            authentiques
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <Button size="small">Voir le détail</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles as any)(WorkshopCard as any) as any;
