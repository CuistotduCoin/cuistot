import Card, { CardContent, CardHeader, CardMedia } from "material-ui/Card";
import Grid from "material-ui/Grid";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import { Theme, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import React, { Component } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import logo from "./react.svg";

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
        image: "https://picsum.photos/240/135/?random",
        title: "Atelier Afterwork"
      },
      {
        description: "Atelier de quatre heures suivi d'un repas convivial",
        image: "https://picsum.photos/240/135/?random",
        title: "Atelier suivi d’un repas"
      },
      {
        description: "Atelier découverte et dégustation",
        image: "https://picsum.photos/240/135/?random",
        title: "Atelier dégustation"
      },
      {
        description: "Récompensez vos équipes autour d'un repas d'exception !",
        image: "https://picsum.photos/240/135/?random",
        title: "Repas prestige"
      },
      {
        description:
          "Notre cuistot est aux founeaux pour changer de l'habituel traiteur : rapidité et simplicité",
        image: "https://picsum.photos/240/135/?random",
        title: "Repas pratique"
      }
    ];

    const typeWorld = [
      {
        description:
          "Faîtes voyager vos papilles et ouvrez-vous à de nouvelles cultures par le biais de la cuisine aux côtés de nos Cuistots d'ailleurs.",
        image: "https://picsum.photos/240/135/?random",
        title: "Cuisine du monde"
      },
      {
        description:
          "Initiez-vous aux principes de la cuisine végétarienne, vegan ou encore ayurvédique, où l’équilibre et les saveurs sont au cœur de l’assiette.",
        image: "https://picsum.photos/240/135/?random",
        title: "Cuisine Bien-être"
      },
      {
        description:
          "Attachés à votre territoire et aux produits locaux et de saison, plongez au cœur d’une cuisine bretonne qui éveillera votre curiosité.",
        image: "https://picsum.photos/240/135/?random",
        title: "Cuisine Terroir"
      },
      {
        description:
          "Percez les secrets de nos artisans pâtissiers et boulangers au travers de recettes créatives et gourmandes.",
        image: "https://picsum.photos/240/135/?random",
        title: "Boulangerie & Pâtisserie"
      }
    ];

    return (
      <>
        <Header />
        <Hero
          imageURL="https://picsum.photos/100/50/?random"
          videoURL="http://thenewcode.com/assets/videos/polina.mp4"
          valueProposition="Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !"
        />
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Business as any) as any;
