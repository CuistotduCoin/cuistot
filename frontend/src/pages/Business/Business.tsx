import Card, { CardContent, CardHeader, CardMedia } from "material-ui/Card";
import Grid from "material-ui/Grid";
import { Theme, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import React, { Component } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import logo from "./react.svg";

const styles = (theme: Theme) => ({
  card: {
    maxWidth: 300
  },
  cardHeader: {
    height: 40
  },
  cardLongContent: {
    height: 90
  },
  cardShortContent: {
    height: 40
  },
  grid: {
    margin: "0px auto",
    maxWidth: "1080px",
    padding: "24px"
  },
  image: {
    height: "100%",
    maxWidth: "300px",
    width: "100%"
  },
  logo: {
    height: "100%",
    maxWidth: "50px",
    width: "100%"
  },
  media: {
    height: 194
  }
});

export interface IBusinessProps {
  classes?: any;
}

export class Business extends React.Component<IBusinessProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Hero
          imageURL="https://picsum.photos/100/50/?random"
          videoURL="http://thenewcode.com/assets/videos/polina.mp4"
        />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          className={classes.grid}
          spacing={16}
        >
          <Grid item={true} sm={6} xs={12} justify="space-around">
            <Grid container={true} justify="center">
              <img
                className={classes.image}
                alt="Atelier Cuistot du Coin"
                src="https://picsum.photos/300/200"
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
              Concoctez avec nous des ateliers culinaires pour vos équipes
            </Typography>
            <Typography variant="body1" align="center">
              Enfiler le tablier et partagez des moments privilégiés et
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
          <Grid item={true} sm={6} xs={12} justify="space-around">
            <Grid container={true} justify="center">
              <img
                className={classes.image}
                alt="Atelier Cuistot du Coin"
                src="https://picsum.photos/300/200"
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
          <Grid item={true} xs={12} sm={6} md={4}>
            <Grid container={true} justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/400/194/?random"
                  title="Atelier Afterwork"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Atelier Afterwork"
                />
                <CardContent className={classes.cardShortContent}>
                  <Typography component="p">
                    Atelier de deux heures suivi d'une dégustation des produits
                    préparés
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={6} md={4}>
            <Grid container={true} justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/400/194/?random"
                  title="Atelier suivi d’un repas convivial"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Atelier suivi d’un repas convivial"
                />
                <CardContent className={classes.cardShortContent}>
                  <Typography component="p">
                    Atelier de quatre heures suivi d'un repas convivial
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={6} md={4}>
            <Grid container={true} justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/400/194/?random"
                  title="Atelier dégustation"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Atelier dégustation"
                />
                <CardContent className={classes.cardShortContent}>
                  <Typography component="p">
                    Atelier découverte et dégustation d'une heure
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={6} md={4}>
            <Grid container={true} justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/400/194/?random"
                  title="Repas prestige"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Repas prestige"
                />
                <CardContent className={classes.cardShortContent}>
                  <Typography component="p">
                    Récompensez vos équipes autour d'un repas d'exception !
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={6} md={4}>
            <Grid container={true} justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/400/194/?random"
                  title="Repas pratique"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Repas pratique"
                />
                <CardContent className={classes.cardShortContent}>
                  <Typography component="p">
                    Notre cuistot est aux founeaux pour changer de l'habituel
                    traiteur : rapidité et simplicité
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
        <Typography variant={"body1"} paragraph={true}>
          Passionnés de cuisine, nos Cuistots ont à cœur de partager leurs
          savoir-faire et leurs recettes authentiques, mais surtout de vous
          faire découvrir leurs univers ! Ils vous invitent à vivre une
          expérience culinaire inédite au sein de votre entreprise ou dans l’un
          de nos lieux partenaires le temps d’un atelier culinaire ou d’un repas
          savoureux
        </Typography>
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
          <Grid item={true} xs={12} sm={6}>
            <Grid container={true} justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/400/194/?random"
                  title="Cuisine du monde"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Cuisine du monde"
                />
                <CardContent className={classes.cardLongContent}>
                  <Typography component="p">
                    Faîtes voyager vos papilles et ouvrez-vous à de nouvelles
                    cultures par le biais de la cuisine aux côtés de nos
                    Cuistots d'ailleurs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <Grid container={true} justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/400/194/?random"
                  title="Cuisine Bien-être"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Cuisine Bien-être"
                />
                <CardContent className={classes.cardLongContent}>
                  <Typography component="p">
                    Initiez-vous aux principes de la cuisine végétarienne, vegan
                    ou encore ayurvédique, où l’équilibre et les saveurs sont au
                    cœur de l’assiette.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <Grid container={true} justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/400/194/?random"
                  title="Cuisine Terroir"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Cuisine Terroir"
                />
                <CardContent className={classes.cardLongContent}>
                  <Typography component="p">
                    Attachés à votre territoire et aux produits locaux et de
                    saison, plongez au cœur d’une cuisine bretonne qui éveillera
                    votre curiosité.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <Grid container={true} justify="center">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/400/194/?random"
                  title="Boulangerie & Pâtisserie"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Boulangerie & Pâtisserie"
                />
                <CardContent className={classes.cardLongContent}>
                  <Typography component="p">
                    Percez les secrets de nos artisans pâtissiers et boulangers
                    au travers de recettes créatives et gourmandes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="title" align="center" component="p">
          Ils ont voyagé aux côtés de nos Cuistots
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={4}>
            <Grid container={true} justify="center">
              <img
                className={classes.logo}
                alt="Atelier Cuistot du Coin"
                src="https://picsum.photos/50/50"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={4}>
            <Grid container={true} justify="center">
              <img
                className={classes.logo}
                alt="Atelier Cuistot du Coin"
                src="https://picsum.photos/50/50"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={4}>
            <Grid container={true} justify="center">
              <img
                className={classes.logo}
                alt="Atelier Cuistot du Coin"
                src="https://picsum.photos/50/50"
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography
          variant="title"
          align="center"
          component="p"
          gutterBottom={true}
        >
          Réservez votre billet et embarquez en équipe pour un savoureux voyage
          culinaire !
        </Typography>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Business as any) as any;
