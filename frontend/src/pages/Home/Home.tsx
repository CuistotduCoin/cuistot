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
import React, { Component } from "react";
import { Link } from "react-router-dom";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  gridList: {
    transform: "translateZ(0)"
  },
  image: {
    opacity: "0.5"
  },
  link: {
    textDecoration: "none"
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
              src="https://picsum.photos/300/200/?random"
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
              src="https://picsum.photos/300/200/?random"
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
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Home as any) as any;
