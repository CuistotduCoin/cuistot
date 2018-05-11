import Card, { CardContent, CardHeader, CardMedia } from "material-ui/Card";
import Grid from "material-ui/Grid";
import { Theme, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import React, { Component } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import WorkshopCardList from "../../components/WorkshopCardList";
import logo from "./react.svg";

const styles = (theme: Theme) => ({
  card: {
    maxWidth: 240
  },
  cardHeader: {
    height: 40
  },
  cardShortContent: {
    height: 40
  },
  grid: {
    margin: "0px auto",
    maxWidth: "1080px"
  },
  media: {
    height: 135
  }
});

export interface IIndividualProps {
  classes?: any;
}

export class Individual extends React.Component<IIndividualProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Hero
          imageURL="https://picsum.photos/100/50/?random"
          videoURL="http://thenewcode.com/assets/videos/polina.mp4"
          valueProposition="Participez à des ateliers de cuisine authentiques et en toute convivialité !"
        />
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
        >
          Plutôt atelier de cuisine collectif ou privatisé, ou encore repas ? Il
          y en a pour tous les goûts !
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
                  image="https://picsum.photos/240/135/?random"
                  title="Atelier de cuisine collectif"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Atelier de cuisine collectif"
                />
                <CardContent className={classes.cardShortContent}>
                  <Typography component="p">
                    Atelier de cuisine collectif chez nos lieux partenaires
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
                  image="https://picsum.photos/240/135/?random"
                  title="Atelier de cuisine privatisé"
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Atelier de cuisine privatisé"
                />
                <CardContent className={classes.cardShortContent}>
                  <Typography component="p">
                    Atelier de cuisine privatisé chez vous ou chez nos lieux
                    partenaires
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
                  image="https://picsum.photos/240/135/?random"
                  title=""
                />
                <CardHeader
                  className={classes.cardHeader}
                  title="Cuistot à domicile"
                />
                <CardContent className={classes.cardShortContent}>
                  <Typography component="p">
                    Notre cuistot est aux fourneaux rien que pour vous et vos
                    invités
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <WorkshopCardList />
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Individual as any) as any;
