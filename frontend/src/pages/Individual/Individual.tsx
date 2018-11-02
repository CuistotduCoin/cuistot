import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import WorkshopCardList from "components/WorkshopCardList";
import React from "react";
import metaInfo from "shared/metaInfo";

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
  link: {
    textDecoration: "none"
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

    const typeActivity: any[] = [
      {
        description:
          "Ateliers de cuisine privatisé chez vous ou chez nos lieux partenaires",
        image:
          "https://static.cuistotducoin.com/img/individual/ateliers-cuisine-privatise.jpg",
        title: "Ateliers de cuisine privatisé",
        url: "https://cuistotducoin.typeform.com/to/WpaATI"
      },
      {
        description:
          "Notre cuistot est aux fourneaux rien que pour vous et vos invités",
        image:
          "https://static.cuistotducoin.com/img/individual/cuistot-a-domicile.jpg",
        title: "Repas à domicile",
        url: "https://cuistotducoin.typeform.com/to/S2XFjV"
      },
      {
        description:
          "Marre des activités extra-scolaires classiques ? Faites découvrir la pâtisserie à vos enfants !",
        image:
          "https://static.cuistotducoin.com/img/individual/atelier-enfant.jpg",
        title: "Abonnement : Ateliers enfants",
        url: "/subscription"
      }
    ];

    const workshops = [
      {
        availableSeat: 6,
        date: "samedi 3 novembre, 10h30-13h30",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/vanessa-amuses-bouches-exotiques.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/vanessa.jpg",
        name: "Amuses-bouches exotiques et punch maison",
        nameCook: "Vanessa",
        price: 30,
        spot: "Brest, Cuisinella",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/LKH380"
      },
      {
        availableSeat: 6,
        date: "vendredi 9 novembre, 15h-16h",
        duration: 1,
        image:
          "https://static.cuistotducoin.com/img/workshops/luis-agnolotti.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/luis.jpg",
        name: "Salon de la gastronomie - Pâtes fraîches",
        nameCook: "Luis",
        price: 0,
        spot: "Salon Vins et Gastronomie",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/HKsqIp"
      },
      {
        availableSeat: 6,
        date: "samedi 10 novembre, 14h-16h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/nadine-crepes-froment.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
        name: "Tournage de crêpes de froment",
        nameCook: "Nadine",
        price: 25,
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/MZZba8"
      },
      {
        availableSeat: 6,
        date: "dimanche 11 novembre, 16h-17h",
        duration: 1,
        image:
          "https://static.cuistotducoin.com/img/workshops/nadine-crepes-froment.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
        name: "Salon de la gastronomie - Démonstration tournage de crêpes",
        nameCook: "Nadine",
        price: 0,
        spot: "Salon Vins et Gastronomie",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/vobFia"
      },
      {
        availableSeat: 6,
        date: "lundi 12 novembre, 14h30-15h30",
        duration: 1,
        image:
          "https://static.cuistotducoin.com/img/workshops/ahmed-cacao-cru.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
        name: "Salon de la gastronomie - Autour du cacao cru",
        nameCook: "Ahmed",
        price: 0,
        spot: "Salon Vins et Gastronomie",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/UjQYe4"
      },
      {
        availableSeat: 6,
        date: "samedi 17 novembre, 9h30-14h",
        duration: 4,
        image:
          "https://static.cuistotducoin.com/img/workshops/michel-decouverte-ayurvedique.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/michel.jpg",
        name: "Cuisine ayurvédique",
        nameCook: "Michel",
        price: 40,
        spot: "Michel, Plougastel-Daoulas",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/rQo1Zx"
      },
      {
        availableSeat: 6,
        date: "mercredi 21 novembre, 17h30-20h",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/ivan-empanadas.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/ivan.jpg",
        name: "Empanadas",
        nameCook: "Ivan",
        price: 35,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/smJrgE"
      },
      {
        availableSeat: 6,
        date: "vendredi 23 novembre, 17h-19h30",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/nadine-crepes-ble-noir.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
        name: "Garnissage de galettes",
        nameCook: "Nadine",
        price: 30,
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/J5pSXj"
      },
      {
        availableSeat: 6,
        date: "samedi 24 novembre, 9h-12h",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/ahmed-entre-ici-et-ailleurs.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
        name: "Entre ici et ailleurs",
        nameCook: "Ahmed",
        price: 35,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/sETMyV"
      },
      {
        availableSeat: 6,
        date: "mercredi 28 novembre, 14h30-16h30",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-crinkles.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Atelier enfant : Crinkles",
        nameCook: "Audrey",
        price: 25,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/YWptrY"
      },
      {
        availableSeat: 6,
        date: "samedi 8 décembre, 9h-13h",
        duration: 4,
        image: "https://static.cuistotducoin.com/img/workshops/ahmed-noel.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
        name: "Repas de Noël ",
        nameCook: "Ahmed",
        price: 50,
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/hGXtRg"
      },
      {
        availableSeat: 6,
        date: "samedi 15 décembre, 10h-12h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-maison-pain-epices.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Atelier enfant : Maison en pain d'épices",
        nameCook: "Audrey",
        price: 35,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/r7wTMZ"
      },
      {
        availableSeat: 6,
        date: "jeudi 27 décembre, 15h-17h",
        duration: 2,
        image: "https://static.cuistotducoin.com/img/workshops/anne-barre.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/anne.jpg",
        name: "Atelier enfant : Que la force soit avec toi !",
        nameCook: "Anne",
        price: 25,
        spot: "Refuge Royal, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/hropRg"
      }
    ];

    const workshopsPending = [
      {
        availableSeat: 6,
        date: "à venir",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/shyam-indien-generique.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/shyam.jpg",
        name: "Découverte de la cuisine indienne",
        nameCook: "Shyam",
        price: 35,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/qgukpu"
      },
      {
        availableSeat: 6,
        date: "à venir",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/valquiria-coxinhas.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/valquiria.jpg",
        name: "Coxinhas & Caipirinha",
        nameCook: "Valquiria",
        price: 35,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/fivZ7h"
      },
      {
        availableSeat: 6,
        date: "à venir",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/takako-sushis.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/takako.jpg",
        name: "Sushis, makis et temaris",
        nameCook: "Takako",
        price: 40,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/ywYxcY"
      },
      {
        availableSeat: 6,
        date: "à venir",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/ahmed-inspiration-africaine.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
        name: "Inspiration Africaine",
        nameCook: "Ahmed",
        price: 35,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/qieHUn"
      },
      {
        availableSeat: 5,
        date: "à venir",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/philippe-degustation-the.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/philippe.jpg",
        name: "Dégustation de thés",
        nameCook: "Philippe",
        price: 25,
        spot: "Palais des Thés, Brest",
        totalSeat: 5,
        typeform: "https://cuistotducoin.typeform.com/to/HHelGm"
      },
      {
        availableSeat: 6,
        date: "à venir",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/ahmed-cacao-cru.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
        name: "Cacao cru",
        nameCook: "Ahmed",
        price: 25,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/EWUT4t"
      },
      {
        availableSeat: 6,
        date: "à venir",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-pate-a-sucre.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Cake Design : Pâte à sucres",
        nameCook: "Audrey",
        price: 45,
        spot: "Audrey, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/X06uWu"
      }
    ];

    return (
      <>
        <Head
          title={metaInfo.metaInfo.individual.title}
          description={metaInfo.metaInfo.individual.description}
        />
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
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
          Nos prochains ateliers collectifs
        </Typography>
        <Typography variant="body1" align="center">
          Ateliers de cuisine collectif chez nos lieux partenaires
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
        <Typography variant="body1" align="center">
          Soyez prévenu des prochaines dates d'ateliers !
        </Typography>
        <WorkshopCardList workshops={workshopsPending} />
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
          className={classes.typography}
        >
          Nos autres prestations sur-mesure
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          {typeActivity.map((activity, index) => (
            <Grid key={index} item={true} xs={12} sm={6}>
              <Grid container={true} justify="center">
                <a className={classes.link} href={activity.url} target="_blank">
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
                </a>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Individual as any) as any;
