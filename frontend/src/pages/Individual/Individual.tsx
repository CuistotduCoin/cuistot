import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Header from "components/Header";
import Hero from "components/Hero";
import WorkshopCardList from "components/WorkshopCardList";
import React, { Component } from "react";

const styles = (theme: Theme) => ({
  card: {
    maxWidth: 300
  },
  cardHeader: {
    background: "rgba(0, 0, 0, 0.4)",
    color: "fff",
    height: 40,
    marginTop: -72
  },
  cardShortContent: {
    height: 40
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  media: {
    height: 135
  },
  title: {
    color: "white"
  },
  typography: {
    marginTop: 15
  }
});

export interface IIndividualProps {
  classes?: any;
}

export class Individual extends React.Component<IIndividualProps, {}> {
  public render() {
    const { classes } = this.props;

    const typeActivity = [
      {
        description: "Ateliers de cuisine collectif chez nos lieux partenaires",
        image: "img/individual/ateliers-cuisine-collectif.jpg",
        title: "Ateliers de cuisine collectif"
      },
      {
        description:
          "Ateliers de cuisine privatisé chez vous ou chez nos lieux partenaires",
        image: "img/individual/ateliers-cuisine-privatise.jpg",
        title: "Ateliers de cuisine privatisé"
      },
      {
        description:
          "Notre cuistot est aux fourneaux rien que pour vous et vos invités",
        image: "img/individual/cuistot-a-domicile.jpg",
        title: "Cuistot à domicile"
      }
    ];

    const workshops = [
      {
        availableSeat: 4,
        date: "samedi 7 juillet, 9h30-12h30",
        image: "https://picsum.photos/400/194/?random",
        imageCook: "https://picsum.photos/40/40/?random",
        name: "Atelier Boulangerie : Pains & Viennoiseries",
        nameCook: "Fabien",
        price: 50,
        spot: "Schmidt, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 1,
        date: "samedi 7 juillet, 15h30-18h30",
        image: "https://picsum.photos/400/194/?random",
        imageCook: "https://picsum.photos/40/40/?random",
        name: "Christian Patisserie : Kouign Amann",
        nameCook: "Christian",
        price: 40,
        spot: "C Chocolat, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 1,
        date: "mercredi 11 juillet, 14h-16h",
        image: "https://picsum.photos/400/194/?random",
        imageCook: "https://picsum.photos/40/40/?random",
        name: "Atelier enfant - Cupcake",
        nameCook: "Audrey",
        price: 30,
        spot: "Chez Audrey, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 8,
        date: "samedi 21 juillet, 10h-12h30",
        image: "https://picsum.photos/400/194/?random",
        imageCook: "https://picsum.photos/40/40/?random",
        name: "Tournage de crèpes de blé noir",
        nameCook: "Nadine",
        price: 25,
        spot: "chez Cuisinella, Brest",
        totalSeat: 8
      },
      {
        availableSeat: 8,
        date: "samedi 4 aout, 14h30-16h30",
        image: "https://picsum.photos/400/194/?random",
        imageCook: "https://picsum.photos/40/40/?random",
        name: "Tournage de crèpes de froment",
        nameCook: "Nadine",
        price: 20,
        spot: "chez Cuisinella, Brest",
        totalSeat: 8
      }
    ];

    return (
      <>
        <Header />
        <Hero
          imageURL="https://picsum.photos/100/50/?random"
          videoURL="video/landing-video.mp4"
          valueProposition="Participez à des ateliers de cuisine authentiques et en toute convivialité !"
          description="Ateliers de Cuisine, Dégustations, Repas authentiques et conviviaux"
        />
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
          className={classes.typography}
        >
          Plutôt atelier de cuisine collectif ou privatisé, ou encore repas ? Il
          y en a pour tous les goûts !
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          {typeActivity.map((activity, index) => (
            <Grid key={index} item={true} xs={12} sm={6} md={3} lg={true}>
              <Grid container={true} justify="center">
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={activity.image}
                    title={activity.title}
                  />
                  <CardHeader
                    className={classes.cardHeader}
                    title={activity.title}
                    classes={{
                      title: classes.title
                    }}
                  />
                  <CardContent className={classes.cardShortContent}>
                    <Typography component="p">
                      {activity.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
          className={classes.typography}
        >
          Nos prochains ateliers collectifs
        </Typography>
        <WorkshopCardList workshops={workshops} />
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Individual as any) as any;
