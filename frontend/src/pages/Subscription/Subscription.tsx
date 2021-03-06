import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
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
    height: 60
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
  title: { color: "white" }
});

interface ISubscriptionProps {
  classes?: any;
}

export class Subscription extends React.Component<ISubscriptionProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Head
          title={metaInfo.metaInfo.subscription.title}
          description={metaInfo.metaInfo.subscription.description}
        />
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Abonnement : Atelier de cuisine pour enfant"
          description="Marre des activités extra-scolaires classiques ? Faites découvrir la pâtisserie à vos enfants !"
        />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          className={classes.grid}
          spacing={16}
        >
          <Typography
            variant="title"
            align="center"
            component="h2"
            gutterBottom={true}
          >
            Votre enfant cuisine et apprend en s'amusant !
          </Typography>
          <Typography variant="body1" align="center">
            La rentrée est toujours synonyme de l’école, de changement de
            classe… Mais c’est aussi un moment de l’année où vos enfants peuvent
            choisir leurs activités extrascolaires !
          </Typography>
          <Typography variant="body1" align="center">
            On pense toujours à la gym, le foot, le basket-ball, la danse … Et
            pourquoi pas la pâtisserie ? Cuistot du Coin propose une expérience
            inédite pour vos enfants ! Chaque mois Audrey, notre Cuistot vous
            propose de réunir vos enfants autour d’ateliers ludiques et
            interactifs. En plus d’être assistante maternelle, Audrey possède
            son CAP Pâtisserie.
          </Typography>
          <Typography
            variant="title"
            align="center"
            component="h2"
            gutterBottom={true}
          >
            Comment ça marche ?
          </Typography>
          <Typography variant="body1" align="center">
            Plusieurs possibilités s’offrent à vous, c’est vous qui choisissez !
            Vous pouvez inscrire votre enfant pour 5 mois ou pour toute l’année
            scolaire soit 10 mois. Chaque mois, Audrey proposera un atelier où
            tous les participants se retrouverons et après à chaque fois à
            réaliser une nouvelle pâtisserie. Les enfants gouteront sur place et
            pourrons également repartir avec le reste de leurs gâteaux, de quoi
            faire partager toute la famille.
          </Typography>
        </Grid>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={12} sm={6}>
            <Grid container={true} justify="center">
              <a
                className={classes.link}
                href="https://cuistotducoin.typeform.com/to/xwGUPX"
                target="_blank"
              >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image="https://static.cuistotducoin.com/img/individual/atelier-enfant.jpg"
                    title="Abonnement de 5 mois"
                  />
                  <CardHeader
                    className={classes.cardHeader}
                    title="Abonnement de 5 mois"
                    classes={{
                      title: classes.title
                    }}
                  />
                  <CardContent className={classes.cardShortContent}>
                    <Typography component="p">
                      5 ateliers avec Audrey
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <Grid container={true}>
              <a
                className={classes.link}
                href="https://cuistotducoin.typeform.com/to/xwGUPX"
                target="_blank"
              >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image="https://static.cuistotducoin.com/img/individual/atelier-enfant.jpg"
                    title="Abonnement de 10 mois"
                  />
                  <CardHeader
                    className={classes.cardHeader}
                    title="Abonnement de 10 mois"
                    classes={{
                      title: classes.title
                    }}
                  />
                  <CardContent className={classes.cardShortContent}>
                    <Typography component="p">
                      10 ateliers avec Audrey & un tablier Cuistot du Coin
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Subscription as any) as any;
