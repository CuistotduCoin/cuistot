import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Layout from "../../components/Layout";
import WorkshopCardList from "../../components/WorkshopCardList";

const styles = (theme: Theme) => ({
  card: {
    width: 300
  },
  cardHeader: {
    background: "rgba(0, 0, 0, 0.4)",
    color: "fff",
    height: 60,
    marginTop: -60
  },
  cardShortContent: {
    height: 80
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

    const typeActivity: any[] = [
      {
        description: "Ateliers de cuisine collectif chez nos lieux partenaires",
        image:
          "https://static.cuistotducoin.com/img/individual/ateliers-cuisine-collectif.jpg",
        title: "Ateliers de cuisine collectif",
        url: "https://cuistotducoin.typeform.com/to/rNhgMi"
      },
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
        availableSeat: 12,
        date: "vendredi 28 septembre, 20h-22h",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/gaetan-decouverte-vins-naturels.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/gaetan.jpg",
        name: "Repas et dégustation de vins naturels",
        nameCook: "Gaetan",
        price: 50,
        spot: "Soif de Vins, Brest",
        totalSeat: 12,
        typeform: "https://cuistotducoin.typeform.com/to/UmTqhi"
      },
      {
        availableSeat: 6,
        date: "samedi 29 septembre, 9h30-13h30",
        duration: 4,
        image:
          "https://static.cuistotducoin.com/img/workshops/ronan-macarons.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/ronan.jpg",
        name: "Macarons",
        nameCook: "Ronan",
        price: 50,
        spot: "Arthur Bonnet, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/jjWrtL"
      },
      {
        availableSeat: 6,
        date: "samedi 29 septembre, 10h-12h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-saucisson-au-chocolat.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Atelier Enfant : Saucisson au chocolat et mini choco",
        nameCook: "Audrey",
        price: 25,
        spot: "Audrey, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/j3jx1h"
      },
      {
        availableSeat: 6,
        date: "samedi 29 septembre, 10h-13h",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/zhang-jiaozi.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/zhang.jpg",
        name: "Jiaozi ou raviolis chinois",
        nameCook: "Zhang",
        price: 35,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/gudvAa"
      },
      {
        availableSeat: 6,
        date: "samedi 6 octobre, 10h-12h30",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-cheesecake-pomme.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Cheesecake caramel au beurre salé et pommes",
        nameCook: "Audrey",
        price: 40,
        spot: "Audrey, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/zgXsH3"
      },
      {
        availableSeat: 6,
        date: "samedi 6 octobre, 17h30-20h30",
        duration: 3,
        image:
          "https://static.cuistotducoin.com/img/workshops/enguerrand-ble-noir.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/enguerrand.jpg",
        name: "Autour du blé noir",
        nameCook: "Enguerrand",
        price: 40,
        spot: "Couleurs cuisines, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/xRzeLG"
      },
      {
        availableSeat: 6,
        date: "samedi 13 octobre, 10h-12h30",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/nadine-crepes-froment.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
        name: "Initiation au tournage de crêpes de froment",
        nameCook: "Nadine",
        price: 20,
        spot: "Arthur Bonnet, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/QklzRk"
      },
      {
        availableSeat: 6,
        date: "samedi 20 octobre, 10h-12h30",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/nadine-crepes-ble-noir.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/nadine.jpg",
        name: "Crêpes de blé noir",
        nameCook: "Nadine",
        price: 25,
        spot: "Arthur Bonnet, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/Z5oZI7"
      },
      {
        availableSeat: 6,
        date: "samedi 20 octobre, 10h-13h",
        duration: 3,
        image: "https://static.cuistotducoin.com/img/workshops/karim-tiep.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/karim.jpg",
        name: "Tiep bou guinar",
        nameCook: "Karim",
        price: 30,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/ZfYA1b"
      },
      /*{
        availableSeat: 6,
        date: "samedi 20 octobre, 10h-12h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/ahmed-cacao-cru.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/ahmed.jpg",
        name: "Cacao cru",
        nameCook: "Ahmed",
        price: 25,
        spot: "Cuisinella, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/EWUT4t"
      },*/
      {
        availableSeat: 8,
        date: "samedi 27 octobre, 10h-12h",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-cupcake-halloween.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Cupcake Halloween",
        nameCook: "Audrey",
        price: 25,
        spot: "chez Audrey, Brest",
        totalSeat: 8,
        typeform: "https://cuistotducoin.typeform.com/to/ZuwZnD"
      },
      {
        availableSeat: 8,
        date: "samedi 27 octobre, 14h-18h",
        duration: 4,
        image:
          "https://static.cuistotducoin.com/img/workshops/fabien-pains-stop-au-gaspi.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/fabien.jpg",
        name: "Recyclez son pain : stop au gaspi",
        nameCook: "Fabien",
        price: 45,
        spot: "Schmidt, Brest",
        totalSeat: 8,
        typeform: "https://cuistotducoin.typeform.com/to/Voq2Qo"
      },
      {
        availableSeat: 8,
        date: "samedi 24 novembre, 9h-13h",
        duration: 4,
        image:
          "https://static.cuistotducoin.com/img/workshops/fabien-pain-maison.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/fabien.jpg",
        name: "Faire son pain maison",
        nameCook: "Fabien",
        price: 50,
        spot: "Schmidt, Brest",
        totalSeat: 8,
        typeform: "https://cuistotducoin.typeform.com/to/RpiaBS"
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
        spot: "Arthur Bonnet, Brest",
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
        spot: "Arthur Bonnet, Brest",
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
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/ywYxcY"
      },
      {
        availableSeat: 6,
        date: "à venir",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/anne-pate-a-tartiner-maison.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/anne.jpg",
        name: "Pour enfants : Pâte à tartiner maison",
        nameCook: "Anne",
        price: 25,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/O0N0S8"
      },
      {
        availableSeat: 6,
        date: "à venir",
        duration: 4,
        image:
          "https://static.cuistotducoin.com/img/workshops/michel-decouverte-ayurvedique.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/michel.jpg",
        name: "Découverte de la cuisine ayurvédique",
        nameCook: "Michel",
        price: 40,
        spot: "Michel, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/wDNHki"
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
        spot: "Schmidt, Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/qieHUn"
      },
      {
        availableSeat: 6,
        date: "à venir",
        duration: 2,
        image:
          "https://static.cuistotducoin.com/img/workshops/audrey-cupcakes-enfants.jpg",
        imageCook: "https://static.cuistotducoin.com/img/cooks/audrey.jpg",
        name: "Pour enfants : Cupcakes",
        nameCook: "Audrey",
        price: 30,
        spot: "Brest",
        totalSeat: 6,
        typeform: "https://cuistotducoin.typeform.com/to/chrUsc"
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
      <Layout
        valueProposition="Participez à des ateliers de cuisine authentiques et en toute convivialité !"
        description="Ateliers de Cuisine, Dégustations, Repas authentiques et conviviaux"
      >
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom
          className={classes.typography}
        >
          Plutôt atelier de cuisine collectif ou privatisé, ou encore repas ? Il
          y en a pour tous les goûts !
        </Typography>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          {typeActivity.map((activity, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <Grid container justify="center">
                <a href={activity.url} target="_blank">
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
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom
          className={classes.typography}
        >
          Nos prochains ateliers collectifs
        </Typography>
        <WorkshopCardList workshops={workshops} />
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom
          className={classes.typography}
        >
          Nos ateliers à venir
        </Typography>
        <Typography variant="body1" align="center">
          Soyez prévenu des prochaines dates d'ateliers !
        </Typography>
        <WorkshopCardList workshops={workshopsPending} />
      </Layout>
    );
  }
}

export default withStyles(styles as any)(Individual as any) as any;
