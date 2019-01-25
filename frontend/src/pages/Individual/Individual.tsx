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
        availableSeat: 8,
        date: "samedi 26 janvier, 9h-14h",
        duration: 5,
        image:
          "https://static.cuistotducoin.com/img/workshops/kevin-brassage.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/kevin.jpg",
        name: "Brassage de bière",
        nameCook: "Kevin",
        price: 65,
        spot: "The Corner, Brest",
        totalSeat: 8,
        typeform: "https://cuistotducoin.typeform.com/to/uWPnEu"
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
      },
      {
        availableSeat: 6,
        date: "samedi 2 février, 10h-13h",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/hayet-couscous.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/hayet.jpg",
        name: "Atelier Maghrébin - Couscous",
        nameCook: "Hayet",
        price: 35,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/uRSySz"
      },
      {
        availableSeat: 6,
        date: "samedi 2 février, 10h30-12h30",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/anne-enfant-crumble.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/anne.jpg",
        name: "Atelier Enfant - Crumble",
        nameCook: "Anne",
        price: 30,
        spot: "Comme les grands, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/pNCmsw"
      },
      {
        availableSeat: 6,
        date: "samedi 9 février, 10h-13h",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/christian-kouign-amann.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/fabien.jpg",
        name: "Kouign Amann",
        nameCook: "Fabien",
        price: 50,
        spot: "Schmidt, Brest",
        totalSeat: 8,
        typeform: "https://cuistotducoin.typeform.com/to/oFW5Ul"
      },
      {
        availableSeat: 6,
        date: "samedi 9 février, 10h-13h",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/takako-repas.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/takako.jpg",
        name: "Repas asiatique",
        nameCook: "Takako",
        price: 50,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/cfZFIZ"
      },
      {
        availableSeat: 6,
        date: "samedi 9 février, 14h-16h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/nadine-crepes-froment.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
        name: "Initiation au tournage de crêpes ",
        nameCook: "Nadine",
        price: 25,
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/oeV7MK"
      },
      {
        availableSeat: 6,
        date: "samedi 9 février, 14h-16h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-st-valentin.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Enfants: Biscuits de St Valentin",
        nameCook: "Audrey",
        price: 30,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/R41sw0"
      },
      {
        availableSeat: 6,
        date: "samedi 16 février, 10h-12h30",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/nadine-crepes-ble-noir.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
        name: "Initiation au tournage de galette",
        nameCook: "Nadine",
        price: 30,
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/Jg3DEa"
      },
      {
        availableSeat: 6,
        date: "samedi 16 février, 14h-16h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/ahmed-cacao-cru.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
        name: "Autour du cacao",
        nameCook: "Ahmed",
        price: 35,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/ElJajU"
      },
      {
        availableSeat: 6,
        date: "jeudi 21 février, 20h30-22h30",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/anne-enfant-crumble.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/anne.jpg",
        name: "Atelier bien-être - Crumble de potimarron",
        nameCook: "Anne",
        price: 35,
        spot: "Refuge Royal, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/EVpB7o"
      },
      {
        availableSeat: 8,
        date: "samedi 2 mars, 9h-14h",
        duration: 5,
        image:
          "https://static.cuistotducoin.com/img/workshops/kevin-brassage.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/kevin.jpg",
        name: "Brassage de bière",
        nameCook: "Kevin",
        price: 65,
        spot: "The Corner, Brest",
        totalSeat: 8,
        typeform: "https://cuistotducoin.typeform.com/to/WUlucN"
      },
      {
        availableSeat: 8,
        date: "samedi 9 mars, 10h-13h",
        duration: 3,
        image: "https://static.cuistotducoin.com/img/workshops/karim-mafe.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/karim.jpg",
        name: "Cuisine Africaine - Mafé",
        nameCook: "Karim",
        price: 35,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/jRQFcs"
      },
      {
        availableSeat: 8,
        date: "samedi 6 avril, 10h-13h",
        duration: 3,
        image: "https://static.cuistotducoin.com/img/workshops/karim-tiep.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/karim.jpg",
        name: "Cuisine Africaine - Tiep",
        nameCook: "Karim",
        price: 35,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/jRQFcs"
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
