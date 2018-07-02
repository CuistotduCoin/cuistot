import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import React from "react";
// @ts-ignore
import HubspotForm from "react-hubspot-form";
import Slider from "react-slick";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  card: {
    maxWidth: 240
  },
  cardHeader: {
    background: "rgba(0, 0, 0, 0.4)",
    color: "fff",
    height: 40,
    marginTop: -72
  },
  cardLongContent: {
    height: 120
  },
  cardShortContent: {
    height: 80
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  image: {
    height: "100%",
    maxWidth: 320,
    width: "100%"
  },
  logo: {
    height: "100%",
    maxWidth: 50,
    width: "100%"
  },
  media: {
    height: 135
  },
  slider: {
    margin: "0px auto",
    maxWidth: 1080,
    paddingBottom: 75
  },
  sliderImage: {
    height: 100,
    margin: "0px auto",
    width: 100
  },
  title: { color: "white" }
});

export interface IBusinessProps {
  classes?: any;
}

export class Business extends React.Component<IBusinessProps, {}> {
  public render() {
    const { classes } = this.props;

    const typeActivity = [
      {
        description:
          "Atelier de deux heures suivi d'une dégustation des produits préparés",
        image: "img/business/atelier-afterwork.jpg",
        title: "Atelier Afterwork"
      },
      {
        description: "Atelier de trois heures suivi d'un repas convivial",
        image: "img/business/atelier-et-repas.jpg",
        title: "Atelier suivi d’un repas"
      },
      {
        description: "Atelier découverte et dégustation",
        image: "img/business/degustation.jpg",
        title: "Atelier dégustation"
      },
      {
        description: "Récompensez vos équipes autour d'un repas d'exception !",
        image: "img/business/repas-prestige.jpg",
        title: "Repas prestige"
      },
      {
        description:
          "Notre cuistot est aux fourneaux et vous prépare des mets du monde à se partager en équipe.",
        image: "img/business/repas-pratique.jpg",
        title: "Repas pratique"
      },
      {
        description: "Une solution clé en main pour un dejeunez rapide",
        image: "img/business/repas-ultra-pratique.jpg",
        title: "Repas ultra pratique"
      }
    ];

    const typeWorld = [
      {
        description:
          "Faîtes voyager vos papilles et ouvrez-vous à de nouvelles cultures par le biais de la cuisine aux côtés de nos Cuistots d'ailleurs.",
        image: "img/business/cuisine-du-monde.jpg",
        title: "Cuisine du monde"
      },
      {
        description:
          "Initiez-vous aux principes de la cuisine végétarienne, vegan ou encore ayurvédique, où l’équilibre et les saveurs sont au cœur de l’assiette.",
        image: "img/business/cuisine-bien-etre.jpg",
        title: "Cuisine Bien-être"
      },
      {
        description:
          "Attachés à votre territoire et aux produits locaux et de saison, plongez au cœur d’une cuisine bretonne qui éveillera votre curiosité.",
        image: "img/business/cuisine-terroir.jpg",
        title: "Cuisine Terroir"
      },
      {
        description:
          "Percez les secrets de nos artisans pâtissiers et boulangers au travers de recettes créatives et gourmandes.",
        image: "img/business/boulangerie-et-patisserie.jpg",
        title: "Boulangerie & Pâtisserie"
      }
    ];

    const participants = [
      {
        image: "img/home/participants/arkea.jpg",
        name: "arkea"
      },
      {
        image: "img/home/participants/brest-metropole.jpg",
        name: "brest metropole et ville"
      },
      {
        image: "img/home/participants/cadiou.jpg",
        name: "cadiou"
      },
      {
        image: "img/home/participants/fortuneo.jpg",
        name: "fortuneo"
      },
      {
        image: "img/home/participants/gl-events.jpg",
        name: "gl events"
      },
      {
        image: "img/home/participants/hippocampe.jpg",
        name: "hippocampe"
      }
    ];
    return (
      <>
        <Head
          title={metaInfo.metaInfo.business.title}
          description={metaInfo.metaInfo.business.description}
        />
        <Header />
        <Hero
          imageURL="https://picsum.photos/100/50/?random"
          videoURL="video/landing-video.mp4"
          valueProposition="Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !"
          description="Ateliers de Cuisine, Dégustations, Repas authentiques et conviviaux"
        />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          className={classes.grid}
          spacing={16}
        >
          <Grid item={true} sm={6} xs={12}>
            <Grid container={true} justify="center">
              <img
                className={classes.image}
                alt="Atelier Cuistot du Coin"
                src="img/business/organisez.jpg"
              />
            </Grid>
          </Grid>
          <Grid item={true} sm={6} xs={12}>
            <Typography
              variant="title"
              align="center"
              component="h2"
              gutterBottom={true}
            >
              Organisez avec nous des ateliers culinaires pour vos équipes
            </Typography>
            <Typography variant="body1" align="center">
              Enfilez le tablier et partagez des moments privilégiés et
              fédérateurs en équipe aux côtés de nos Cuistots passionnés aux
              univers culinaires diversifiés
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          className={classes.grid}
          spacing={16}
        >
          <Grid item={true} sm={6} xs={12}>
            <Typography
              variant="title"
              align="center"
              component="h2"
              gutterBottom={true}
            >
              Passez à table, régalez-vous ! Nos Cuistots s’occupent de tout !
            </Typography>
            <Typography variant="body1" align="center">
              Découverte de saveurs et partage s’invitent au cœur de vos repas
              concoctés par nos Cuistots. Partez à leur rencontre et
              laissez-vous porter le temps d’un voyage gustatif autour de leurs
              plats «fait-maison».
            </Typography>
          </Grid>
          <Grid item={true} sm={6} xs={12}>
            <Grid container={true} justify="center">
              <img
                className={classes.image}
                alt="Atelier Cuistot du Coin"
                src="img/business/passez-a-table.jpg"
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
        >
          Plutôt atelier de cuisine ou repas ? Il y en a pour tous les goûts !
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          {typeActivity.map((activity, index) => (
            <Grid key={index} item={true} xs={8} md={4}>
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
        >
          Notre recette ?
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={12} sm={4}>
            <Grid
              container={true}
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography variant={"subheading"}>A votre écoute</Typography>
              <Typography variant={"body1"}>
                Faîtes-nous part de vos besoins et de vos envies.
              </Typography>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={4}>
            <Grid
              container={true}
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography variant={"subheading"}>
                Une diversité de saveurs
              </Typography>
              <Typography variant={"body1"}>
                Nous sélectionnons nos ateliers et nos repas les mieux adaptés
                et définissons ensemble leurs modalités.
              </Typography>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={4}>
            <Grid
              container={true}
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography variant={"subheading"}>
                On s’occupe de tout
              </Typography>
              <Typography variant={"body1"}>
                Repas et ateliers sont organisés de A à Z par nos soins. Enfilez
                le tablier ou passez à table: il n’y a plus qu’à déguster!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
        >
          C’est parti pour le voyage des papilles !
        </Typography>
        <Grid container={true} className={classes.grid}>
          <Typography variant={"body1"} paragraph={true}>
            Passionnés de cuisine, nos Cuistots ont à cœur de partager leurs
            savoir-faire et leurs recettes authentiques, mais surtout de vous
            faire découvrir leurs univers ! Ils vous invitent à vivre une
            expérience culinaire inédite au sein de votre entreprise ou dans
            l’un de nos lieux partenaires le temps d’un atelier culinaire ou
            d’un repas savoureux
          </Typography>
        </Grid>
        <Typography
          variant="title"
          align="center"
          component="p"
          gutterBottom={true}
        >
          A vous de choisir votre destination !
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          {typeWorld.map((world, index) => (
            <Grid key={index} item={true} xs={12} sm={6} md={3} lg={true}>
              <Grid container={true} justify="center">
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={world.image}
                    title={world.title}
                  />
                  <CardHeader
                    className={classes.cardHeader}
                    title={world.title}
                    classes={{
                      title: classes.title
                    }}
                  />
                  <CardContent className={classes.cardLongContent}>
                    <Typography component="p">{world.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="title"
          align="center"
          component="p"
          gutterBottom={true}
        >
          Ils ont voyagé aux côtés de nos Cuistots
        </Typography>
        <div className={classes.slider}>
          <Slider autoplay={true} slidesToShow={4} slidesToScroll={1}>
            {participants.map((participant, index) => (
              <div key={index}>
                <img
                  src={participant.image}
                  alt={participant.name}
                  className={classes.sliderImage}
                />
              </div>
            ))}
          </Slider>
        </div>
        <Typography
          variant="title"
          align="center"
          component="p"
          gutterBottom={true}
        >
          Réservez votre billet et embarquez en équipe pour un savoureux voyage
          culinaire !
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <HubspotForm
            portalId="3826127"
            formId="2db2fd4a-3e67-4396-a725-e8320947201e"
          />
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Business as any) as any;
