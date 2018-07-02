import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  block: {
    overflow: "hidden",
    position: "relative"
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  gridTile: {
    margin: "0px auto"
  },
  image: {
    opacity: "0.5",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    width: "100%"
  },
  link: {
    textDecoration: "none"
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
  tile: {
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    height: "100%",
    left: 0,
    position: "absolute",
    right: 0,
    textAlign: "center",
    top: 0
  },
  tileEntreprise: {
    "&:hover": {
      opacity: 0.9
    },
    "&:hover $tileSubtitle": {
      opacity: 1
    },
    backgroundColor: "#e84a4c",
    height: 180
  },
  tileParticulier: {
    "&:hover": {
      opacity: 0.9
    },
    "&:hover $tileSubtitle": {
      opacity: 1
    },
    backgroundColor: "#47b8b2",
    height: 180
  },
  tileSubtitle: {
    color: "#fff",
    opacity: 0,
    textAlign: "center",
    transition: "opacity 0.35s, transform 0.35s"
  },
  tileTitle: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center"
  },
  typography: {
    marginTop: 15
  }
});

interface IHomeProps {
  classes?: any;
}

export class Home extends React.Component<IHomeProps, {}> {
  public render() {
    const { classes } = this.props;
    const partners = [
      {
        image: "img/home/partners/amaiur.jpg",
        name: "amaiur"
      },
      {
        image: "img/home/partners/arthur-bonnet.jpg",
        name: "Arthur Bonnet"
      },
      {
        image: "img/home/partners/c-chocolat.jpg",
        name: "C chocolat"
      },
      {
        image: "img/home/partners/couleurs-cuisines.jpg",
        name: "Couleurs Cuisines"
      },
      {
        image: "img/home/partners/cuisinella.jpg",
        name: "cuisinella"
      },
      {
        image: "img/home/partners/palais-des-thes.jpg",
        name: "Palais des thes"
      },
      {
        image: "img/home/partners/roi-de-bretagne.jpg",
        name: "Roi de Bretagne"
      },
      {
        image: "img/home/partners/schmidt.jpg",
        name: "Schmidt"
      },
      {
        image: "img/home/partners/soif-de-vins.jpg",
        name: "Soif de vins"
      },
      {
        image: "img/home/partners/the-corner.jpg",
        name: "The corner"
      },
      {
        image: "img/home/partners/tot-ou-tard.jpg",
        name: "Tot ou tard"
      },
      {
        image: "img/home/partners/tuk-tuk-bazar.jpg",
        name: "Tuk Tuk Bazar"
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
          title={metaInfo.metaInfo.home.title}
          description={metaInfo.metaInfo.home.description}
        />
        <Header />
        <Hero
          imageURL="https://picsum.photos/700/400/?random"
          videoURL="video/landing-video.mp4"
          valueProposition="Faîtes voyager vos papilles et ouvrez-vous à de nouvelles cultures par le biais de la cuisine aux côtés de nos Cuistots"
          description="Ateliers de Cuisine, Dégustations, Repas authentiques et conviviaux"
        />
        <Grid
          container={true}
          alignItems="center"
          spacing={0}
          className={classes.gridTile}
        >
          <Grid item={true} xs={12} sm={6}>
            <Grid container={true} className={classes.tileEntreprise}>
              <div className={classes.block}>
                <img
                  src="img/home/business.jpg"
                  alt={"Entreprise"}
                  className={classes.image}
                />
                <Link to="/business" className={classes.link}>
                  <div className={classes.tile}>
                    <Grid container={true} direction="column">
                      <Typography
                        variant="headline"
                        align="center"
                        component="h2"
                        className={classes.tileTitle}
                      >
                        Vous etes une entreprises
                      </Typography>
                      <Typography
                        variant="body2"
                        align="center"
                        component="p"
                        className={classes.tileSubtitle}
                      >
                        Concoctez avec nous une expérience culinaire authentique
                        et gourmande pour vos salariés !
                      </Typography>
                    </Grid>
                  </div>
                </Link>
              </div>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <Grid container={true} className={classes.tileParticulier}>
              <div className={classes.block}>
                <img
                  src="img/home/individual.jpg"
                  alt={"Particulier"}
                  className={classes.image}
                />
                <Link to="/individual" className={classes.link}>
                  <div className={classes.tile}>
                    <Grid container={true} direction="column">
                      <Typography
                        variant="headline"
                        align="center"
                        component="h2"
                        className={classes.tileTitle}
                      >
                        Vous etes un particulier
                      </Typography>
                      <Typography
                        variant="body2"
                        align="center"
                        component="p"
                        className={classes.tileSubtitle}
                      >
                        Participez à des ateliers de cuisine authentiques et en
                        toute convivialité !
                      </Typography>
                    </Grid>
                  </div>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
          className={classes.typography}
        >
          Ateliers, dégustation ou repas, retrouvez nos ingrédients clés :
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
              <Typography variant={"subheading"}>
                Authenticité et Convivialité
              </Typography>
              <Typography variant={"body1"}>
                Parce que le voyage commence d’abord dans l’assiette, découvrez
                une cuisine qui invite à l’évasion et percez les secrets des
                recettes de nos Cuistots passionnés.
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
              <Typography variant={"subheading"}>Partage</Typography>
              <Typography variant={"body1"}>
                Au-delà de la cuisine, plongez dans les univers de nos Cuistots
                et découvrez de nouveaux horizons.
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
              <Typography variant={"subheading"}>Diversité</Typography>
              <Typography variant={"body1"}>
                Divers formats et univers culinaires sont proposés chez Cuistot
                du Coin. De quoi satisfaire vos papilles !
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
          Nos partenaires
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={12}>
            <Typography variant={"body1"}>
              Le talent culinaire est partout et Cuistot du Coin souhaite le
              révéler. Nous nous sommes entourés d’artisans et de commerçants
              passionnés pour vous offrir des expériences culinaires sur-mesure.
            </Typography>
          </Grid>
        </Grid>

        <div className={classes.slider}>
          <Slider autoplay={true} slidesToShow={4} slidesToScroll={1}>
            {partners.map(partner => (
              <div key={partner.name}>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className={classes.sliderImage}
                  key={partner.name}
                />
              </div>
            ))}
          </Slider>
        </div>

        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
        >
          Ils ont participé à l’aventure Cuistot du Coin
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
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Home as any) as any;
