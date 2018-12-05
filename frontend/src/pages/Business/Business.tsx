import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Group from "@material-ui/icons/Group";
import Public from "@material-ui/icons/Public";
import VpnKey from "@material-ui/icons/VpnKey";
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
    width: 300
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
    height: 60
  },
  cardtypeWorld: {
    width: 240
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
  link: {
    textDecoration: "none"
  },
  logo: {
    height: "100%",
    maxWidth: 50,
    width: "100%"
  },
  marginTop: {
    marginTop: 10
  },
  media: {
    height: 135
  },
  slider: {
    margin: "0px auto",
    maxWidth: 1080,
    paddingBottom: 25,
    width: "calc(100% - 120px)"
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
    const sliderSettings = {
      autoplay: true,
      infinite: true,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2
          }
        }
      ],
      slidesToScroll: 1,
      slidesToShow: 4
    };

    const typeActivity = [
      {
        description: "Atelier suivi d'une dégustation ou d'un repas",
        image:
          "https://static.cuistotducoin.com/img/business/atelier-afterwork.jpg",
        title: "Atelier de cuisine",
        url: "https://cuistotducoin.typeform.com/to/XkgNMt"
      },
      {
        description: "Une solution clé en main pour un dejeunez rapide",
        image: "https://static.cuistotducoin.com/img/business/buffet.jpg",
        title: "Buffet",
        url: "https://cuistotducoin.typeform.com/to/hakg4D"
      },
      {
        description: "Récompensez vos équipes autour d'un repas d'exception !",
        image:
          "https://static.cuistotducoin.com/img/business/repas-prestige.jpg",
        title: "Repas",
        url: "https://cuistotducoin.typeform.com/to/OMwjPe"
      }
    ];

    const participants = [
      {
        image:
          "https://static.cuistotducoin.com/img/business/participants/arkea.jpg",
        name: "arkea"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/business/participants/brest-metropole.jpg",
        name: "brest metropole et ville"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/business/participants/cadiou.jpg",
        name: "cadiou"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/business/participants/fortuneo.jpg",
        name: "fortuneo"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/business/participants/gl-events.jpg",
        name: "gl events"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/business/participants/hippocampe.jpg",
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
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !"
          description="Ateliers de Cuisine, Dégustations, Repas authentiques et conviviaux"
        />
        <Typography
          variant="title"
          align="center"
          component="h2"
          gutterBottom={true}
          className={classes.marginTop}
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
              <Grid container={true} direction="row">
                <Group />
                <Typography variant={"title"}>Team building</Typography>
              </Grid>
              <Typography variant={"body1"}>
                Découvrez nos buffets et ateliers fédérateurs pour soutenir
                votre culture d’entreprise, renforcer le bien-être au travail,
                consolider l’esprit d’équipe
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
              <Grid container={true} direction="row">
                <Public />
                <Typography variant={"title"}>Diversité</Typography>
              </Grid>
              <Typography variant={"body1"}>
                Curieux ou amateurs de saveurs plus traditionnelles, nous vous
                suggérons des univers culinaires qui permettront à vos équipes
                de voyager.
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
              <Grid container={true} direction="row">
                <VpnKey />
                <Typography variant={"title"}>Clés en mains</Typography>
              </Grid>
              <Typography variant={"body1"}>
                Repas et ateliers sont organisés de A à Z par nos soins. Enfilez
                le tablier ou passez à table: il n’y a plus qu’à déguster !
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
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          {typeActivity.map((activity, index) => (
            <Grid key={index} item={true} xs={12} sm={6} md={4}>
              <Grid container={true}>
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
        <Typography
          variant="title"
          align="center"
          component="p"
          gutterBottom={true}
        >
          Ils ont voyagé aux côtés de nos Cuistots
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={12}>
            <Typography variant={"body1"}>
              Ils ont participé à nos ateliers, déjeuné aux cotés de nos
              Cuistots, pour renforcer les liens de leurs salariés, récompenser
              la réussite d'un projet ou encore pour acceuillir leurs
              partenaires ou clients.
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.slider}>
          <Slider {...sliderSettings}>
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
