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
        date: "samedi 15 décembre, 12h-14h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/anne-bien-etre.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/anne.jpg",
        name: "Déjeuner bien-être",
        nameCook: "Anne",
        price: 35,
        spot: "Le Pop Up du Père Noël Brestoa",
        totalSeat: 5,
        typeform: "https://cuistotducoin.typeform.com/to/PPzMhJ"
      },
      {
        availableSeat: 6,
        date: "samedi 15 décembre, 14h-16h",
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
        date: "samedi 15 décembre, 14h-16h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/nadine-apéro.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
        name: "Apéro Festif autour du blé noir",
        nameCook: "Nadine",
        price: 30,
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/c6Rg7h"
      },
      {
        availableSeat: 6,
        date: "mardi 18 décembre, 16h-18h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/nadine-crepes-froment.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
        name: "Initiation au tournage de crêpes de froment",
        nameCook: "Nadine",
        price: 25,
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/SNn9Pu"
      },
      {
        availableSeat: 6,
        date: "samedi 22 décembre, 10h-12h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/takako-sushis.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/takako.jpg",
        name: "Sushis, makis, temaris",
        nameCook: "Takako",
        price: 25,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/ignf0F"
      },
      {
        availableSeat: 6,
        date: "vendredi 28 décembre, 15h-17h",
        duration: 2,
        image: "https://static.cuistotducoin.com/img/workshops/anne-barre.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/anne.jpg",
        name: "Atelier enfant : Que la force soit avec toi !",
        nameCook: "Anne",
        price: 25,
        spot: "Refuge Royal, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/hropRg"
      },
      {
        availableSeat: 6,
        date: "samedi 12 janvier, 9h-14h",
        duration: 5,
        image:
          "https://static.cuistotducoin.com/img/workshops/kevin-brassage.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/generique.jpg",
        name: "Atelier brassage",
        nameCook: "Kevin",
        price: 60,
        spot: "The Corner, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/SYDOzE"
      },
      {
        availableSeat: 6,
        date: "samedi 19 janvier, 10h-13h",
        duration: 3,
        image: "https://static.cuistotducoin.com/img/workshops/karim-tiep.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/karim.jpg",
        name: "Tiep bou guinar",
        nameCook: "Karim",
        price: 30,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/MF6lYM"
      },
      {
        availableSeat: 6,
        date: "samedi 19 janvier, 10h-12h30",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-cheesecake-pomme.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Cheesecake caramel",
        nameCook: "Audrey",
        price: 40,
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/bzR8yN"
      },
      {
        availableSeat: 6,
        date: "samedi 26 janvier, 10h-12h30",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-galette-des-rois.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Atelier enfant : Galette des rois",
        nameCook: "Audrey",
        price: 30,
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/cAq2Mg"
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
          Nos prochains ateliers collectifs à Brest
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
