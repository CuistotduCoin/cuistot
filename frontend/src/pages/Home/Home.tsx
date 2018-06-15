import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
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
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  gridList: {
    transform: "translateZ(0)"
  },
  image: {
    opacity: "0.5"
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
  tileBar: {
    height: "100%",
    textAlign: "center",
    transition: "all 0.2s ease"
  },
  tileEntreprise: { backgroundColor: "#e84a4c" },
  tileParticulier: { backgroundColor: "#47b8b2" }
});

interface IHomeProps {
  classes?: any;
}

export class Home extends React.Component<IHomeProps, {}> {
  public render() {
    const { classes } = this.props;
    const partners = [
      {
        image: "img/home/partners/amaiur.png",
        name: "amaiur"
      },
      {
        image: "img/home/partners/arthur-bonnet.jpg",
        name: "Arthur Bonnet"
      },
      {
        image: "img/home/partners/c-chocolat.png",
        name: "C chocolat"
      },
      {
        image: "img/home/partners/couleurs-cuisines.png",
        name: "Couleurs Cuisines"
      },
      {
        image: "img/home/partners/cuisinella.png",
        name: "cuisinella"
      },
      {
        image: "img/home/partners/palais-des-thes.jpg",
        name: "Palais des thes"
      },
      {
        image: "img/home/partners/roi-de-bretagne.png",
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
        image: "img/home/partners/the-corner.png",
        name: "The corner"
      },
      {
        image: "img/home/partners/tot-ou-tard.jpg",
        name: "Tot ou tard"
      },
      {
        image: "img/home/partners/tuk-tuk-bazar.png",
        name: "Tuk Tuk Bazar"
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
          videoURL="http://thenewcode.com/assets/videos/polina.mp4"
        />
        <GridList className={classes.gridList} cols={2} spacing={0}>
          <GridListTile className={classes.tileEntreprise}>
            <img
              src="img/home/business.jpg"
              alt={"Entreprise"}
              className={classes.image}
            />
            <Link to="/business" className={classes.link}>
              <GridListTileBar
                titlePosition="top"
                title="Vous êtes une entreprise"
                className={classes.tileBar}
              />
            </Link>
          </GridListTile>
          <GridListTile className={classes.tileParticulier}>
            <img
              src="img/home/individual.jpg"
              alt={"Particulier"}
              className={classes.image}
            />
            <Link to="/individual" className={classes.link}>
              <GridListTileBar
                titlePosition="top"
                title="Vous êtes un particulier"
                className={classes.tileBar}
              />
            </Link>
          </GridListTile>
        </GridList>
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
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
              <div>
                <img
                  src={partner.image}
                  alt={partner.name}
                  className={classes.sliderImage}
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
        <Grid
          container={true}
          justify="space-around"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={12}>
            <Typography variant={"body1"} />
          </Grid>
        </Grid>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={3}>
            <Grid container={true} justify="center">
              <img
                className={classes.logo}
                alt="Atelier Cuistot du Coin"
                src="https://picsum.photos/50/50"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={3}>
            <Grid container={true} justify="center">
              <img
                className={classes.logo}
                alt="Atelier Cuistot du Coin"
                src="https://picsum.photos/50/50"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={3}>
            <Grid container={true} justify="center">
              <img
                className={classes.logo}
                alt="Atelier Cuistot du Coin"
                src="https://picsum.photos/50/50"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={3}>
            <Grid container={true} justify="center">
              <img
                className={classes.logo}
                alt="Atelier Cuistot du Coin"
                src="https://picsum.photos/50/50"
              />
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Home as any) as any;
