import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Theme, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import Kitchen from "@material-ui/icons/Kitchen";
import LocalDining from "@material-ui/icons/LocalDining";
import Lock from "@material-ui/icons/Lock";
import People from "@material-ui/icons/People";
import BookForm from "components/BookForm";
import Cover from "components/Cover";
import Footer from "components/Footer";
import Header from "components/Header";
import StarRating from "components/StarRating";
import React from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({
  avatar: {
    backgroundColor: green[500],
    height: 80,
    width: 80
  },
  button: {
    margin: theme.spacing.unit
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  infoReservartion: {
    padding: theme.spacing.unit
  },
  innerGrid: {
    padding: 24
  },
  tabs: {
    minWidth: 0
  }
});

interface IWorkshopProps {
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
  minSeat: string;
  maxSeat: number;
  totalDate?: number;
  dayEndBook: number;
  eventType: string;
  cuisineType: string;
  timeEvent: string;
}

export class Workshop extends React.Component<IWorkshopProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header static={true} />
        <Cover imageURL={this.props.image} />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={2}>
            <Grid container={true} justify="center">
              <Avatar className={classes.avatar} src={this.props.imageCook} />
            </Grid>
          </Grid>
          <Grid item={true} xs={10}>
            <Grid container={true}>
              <Grid item={true}>
                {this.props.rating && (
                  <Grid container={true}>
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
                )}
                <Typography variant="title" component="p" gutterBottom={true}>
                  Recontrez {this.props.nameCook}
                </Typography>
                <Typography
                  variant="headline"
                  component="h2"
                  gutterBottom={true}
                >
                  {this.props.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          className={classes.grid}
        >
          <Grid item={true} xs={8}>
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab label="Au menu" className={classes.tabs} />
              <Tab label="Le Cuistot" className={classes.tabs} />
              <Tab label="Commentaires" className={classes.tabs} />
              <Tab
                label="Informations complémentaires"
                className={classes.tabs}
              />
              <Tab className={classes.tabs} icon={<KeyboardArrowUp />} />
            </Tabs>
            <Grid
              container={true}
              justify="space-around"
              alignItems="center"
              className={classes.innerGrid}
            >
              <Grid item={true}>
                <Grid container={true}>
                  <Kitchen />
                  <Typography>{this.props.eventType}</Typography>
                </Grid>
              </Grid>
              <Grid item={true}>
                <Grid container={true}>
                  <LocalDining />
                  <Typography>{this.props.cuisineType}</Typography>
                </Grid>
              </Grid>
              <Grid item={true}>
                <Grid container={true}>
                  <People />
                  <Typography>
                    de {this.props.minSeat} à {this.props.maxSeat} invités
                  </Typography>
                </Grid>
              </Grid>
              <Grid item={true}>
                <Grid container={true}>
                  <AccessTime />
                  <Typography>{this.props.timeEvent}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Typography variant="headline" component="h2" gutterBottom={true}>
                Au menu
              </Typography>
              <Typography variant="body1" component="p" paragraph={true}>
                Atelier + A emporter : Initiation à la pâte à sucre Découvrez la
                pâte à sucre et ses techniques très spécifique avec notre
                nouveau cuistot: Audrey ! Venez apprendre à sublimer vos
                pâtisseries et à confectionner vos gâteaux d’anniversaire.
                Préparation de la ganache au chocolat qui garnira et recouvrira
                le gâteau- Préparation des éléments de décorations et de la pâte
                à sucre (technique de lissage et de pose)
              </Typography>
              <Typography variant="headline" component="h2" gutterBottom={true}>
                Photos & Videos
              </Typography>
              <Typography variant="headline" component="h2" gutterBottom={true}>
                Le Cuistot
              </Typography>
              <Typography variant="body1" component="p" paragraph={true}>
                Audrey passait son temps dans la cuisine de sa grand-mère quand
                elle était petite. Et elle a toujours aimé la pâtisserie et
                tester de nouvelles recettes, de nouvelles techniques. Jusqu'à
                ce que sa passion et ses proches l'a poussèrent à passer son
                CAP. Maintenant elle souhaite le faire découvrir aux autres.
              </Typography>
              <Typography variant="headline" component="h2" gutterBottom={true}>
                Commentaires
              </Typography>
              <Typography variant="headline" component="h2" gutterBottom={true}>
                Informations complémentaires
              </Typography>
            </Grid>
          </Grid>
          <Grid item={true} xs={4}>
            <Typography variant="headline" component="h3">
              Faites votre réservation :
            </Typography>
            <Paper elevation={1} className={classes.infoReservartion}>
              <BookForm
                price={this.props.price}
                availableSeat={this.props.availableSeat}
                dayEndBook={this.props.dayEndBook}
              />
            </Paper>
            <Grid>
              <Lock />
              <Typography variant="body1">
                Paiement sécurisé par Mangopay
              </Typography>
              <Typography variant="body1">
                Vous pouvez payer avec
                <span>
                  <img
                    src="https://static.cuistotducoin.com/img/workshop/visa.png"
                    alt="visa"
                  />
                  <img
                    src="https://static.cuistotducoin.com/img/workshop/masterpass.png"
                    alt="masterpass"
                  />
                  <img
                    src="https://static.cuistotducoin.com/img/workshop/maestro.png"
                    alt="maestro"
                  />
                </span>
              </Typography>
              <Typography variant="body1">Conditions d'annulation</Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Poser une question au cuistot
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Workshop as any) as any;
