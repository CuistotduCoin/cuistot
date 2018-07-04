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
    width: 300
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
        availableSeat: 8,
        date: "samedi 21 juillet, 10h-12h30",
        image: "img/workshops/nadine-crepes-ble-noir.jpg",
        imageCook: "img/cooks/nadine.jpg",
        name: "Tournage de crèpes de blé noir",
        nameCook: "Nadine",
        price: 25,
        spot: "Cuisinella, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 8,
        date: "samedi 4 aout, 14h30-16h30",
        image: "img/workshops/nadine-crepes-froment.jpg",
        imageCook: "img/cooks/nadine.jpg",
        name: "Tournage de crèpes de froment",
        nameCook: "Nadine",
        price: 20,
        spot: "Cuisinella, Brest",
        totalSeat: 8
      }
    ];

    const workshopsPending = [
      {
        availableSeat: 8,
        date: "à denir",
        image: "img/workshops/fabien-pain-maison.jpg",
        imageCook: "img/cooks/fabien.jpg",
        name: "Faire son pain maison",
        nameCook: "Fabien",
        price: 50,
        spot: "Schmidt, Brest",
        totalSeat: 8
      },
      {
        availableSeat: 6,
        date: "à denir",
        image: "img/workshops/shyam-indien-generique.jpg",
        imageCook: "img/cooks/shyam.jpg",
        name: "Découverte de la cuisine indienne",
        nameCook: "Shyam",
        price: 35,
        spot: "Arthur Bonnet, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/valquiria-coxinhas.jpg",
        imageCook: "img/cooks/valquiria.jpg",
        name: "Coxinhas & Caipirinha",
        nameCook: "Valquiria",
        price: 35,
        spot: "Arthur Bonnet, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/audrey-pate-a-sucre.jpg",
        imageCook: "img/cooks/audrey.jpg",
        name: "Cake Design : Pâte à sucres",
        nameCook: "Audrey",
        price: 45,
        spot: "Audrey, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/anaelle-sarrasin.jpg",
        imageCook: "img/cooks/anaelle.jpg",
        name: "À la découverte du sarrasin",
        nameCook: "Anaelle",
        price: 25,
        spot: "Anaelle, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/takako-sushis.jpg",
        imageCook: "img/cooks/takako.jpg",
        name: "Sushis, makis et temaris",
        nameCook: "Takako",
        price: 40,
        spot: "Schmidt, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/ahmed-cacao-cru.jpg",
        imageCook: "img/cooks/ahmed.jpg",
        name: "Cacao cru",
        nameCook: "Ahmed",
        price: 25,
        spot: "Cuisinella, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/anne-pate-a-tartiner-maison.jpg",
        imageCook: "img/cooks/anne.jpg",
        name: "pour Enfants : Pâte à tartiner maison",
        nameCook: "Anne",
        price: 25,
        spot: "Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/michel-decouverte-ayurvedique.jpg",
        imageCook: "img/cooks/michel.jpg",
        name: "Découverte de la cuisine ayurvédique",
        nameCook: "Michel",
        price: 40,
        spot: "Michel, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/ronan-macarons.jpg",
        imageCook: "img/cooks/ronan.jpg",
        name: "Macarons",
        nameCook: "Ronan",
        price: 50,
        spot: "Schmidt, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/mikaelle-cuisine-vegetale.jpg",
        imageCook: "img/cooks/mikaelle.jpg",
        name: "Découverte de la cuisine végétale crue",
        nameCook: "Mikaelle",
        price: 60,
        spot: "Ô-Shun, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/ahmed-entre-ici-et-ailleurs.jpg",
        imageCook: "img/cooks/ahmed.jpg",
        name: "Entre ici et ailleurs",
        nameCook: "Ahmed",
        price: 35,
        spot: "Schmidt, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 6,
        date: "à venir",
        image: "img/workshops/ahmed-inspiration-africaine.jpg",
        imageCook: "img/cooks/ahmed.jpg",
        name: "Inspiration Africaine",
        nameCook: "Ahmed",
        price: 35,
        spot: "Schmidt, Brest",
        totalSeat: 6
      },
      {
        availableSeat: 8,
        date: "à venir",
        image: "img/workshops/fabien-pains-stop-au-gaspi.jpg",
        imageCook: "img/cooks/fabien.jpg",
        name: "Recyclez son pain : stop au gaspi",
        nameCook: "Fabien",
        price: 45,
        spot: "Arthur Bonnet, Brest",
        totalSeat: 8
      },
      {
        availableSeat: 12,
        date: "à venir",
        image: "img/workshops/gaetan-decouverte-vins-naturels.jpg",
        imageCook: "img/cooks/gaetan.jpg",
        name: "A la découverte des vins naturels",
        nameCook: "Gaetan",
        price: 40,
        spot: "Soif de Vins, Brest",
        totalSeat: 12
      },
      {
        availableSeat: 5,
        date: "à venir",
        image: "img/workshops/christian-kouign-amann.jpg",
        imageCook: "img/cooks/christian.jpg",
        name: "Kouign Amann",
        nameCook: "Christian",
        price: 40,
        spot: "C Chocolat, Brest",
        totalSeat: 5
      }
    ];

    return (
      <>
        <Header />
        <Hero
          imageURL="img/home/landing.jpg"
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
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
          className={classes.typography}
        >
          Nos ateliers à venir
        </Typography>
        <WorkshopCardList workshops={workshopsPending} />
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Individual as any) as any;
