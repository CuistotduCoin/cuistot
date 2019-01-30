import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import HubspotForm from "react-hubspot-form";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Layout from "../../components/Layout";

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
  cardLongContent: {
    height: 140
  },
  cardShortContent: {
    height: 80
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
    maxWidth: 950,
    paddingBottom: 75,
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
        url: "https://landbot.io/u/H-117244-32JN5PQL01AGBAXB/index.html"
      },
      {
        description: "Une solution clé en main pour un dejeuner ou diner",
        image: "https://static.cuistotducoin.com/img/business/buffet.jpg",
        title: "Buffet",
        url: "https://landbot.io/u/H-117244-32JN5PQL01AGBAXB/index.html"
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
      <Layout
        valueProposition="Apportez de la saveur à vos événements d’entreprise"
        description="Journées d’équipe, temps-forts en entreprise, activités collaboratives, buffets savoureux"
      >
        <Grid
          container
          justify="space-around"
          alignItems="center"
          className={classes.grid}
          spacing={16}
        >
          <Grid item sm={6} xs={12}>
            <Grid container justify="center">
              <img
                className={classes.image}
                alt="Atelier Cuistot du Coin"
                src="https://static.cuistotducoin.com/img/business/organisez.jpg"
              />
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography
              variant="h6"
              align="center"
              component="h2"
              gutterBottom
            >
              Vous êtes un Comité d’Entreprise
            </Typography>
            <Typography variant="body1" align="center">
              Nous construisons à vos côtés un programme d’ateliers de cuisine privatisés dans nos lieux partenaires pour vos salariés. Les ateliers proposés sont accessibles à tous, amateurs ou passionnés avertis. Nos formats d’ateliers et la diversité des univers culinaires de nos cuistots permettront de satisfaire le plus grand nombre, tout en garantissant des moments conviviaux.
            </Typography>
            <Grid container alignItems="center" justify="center">
              <Button variant="outlined" color="primary">En savoir plus</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          className={classes.grid}
          spacing={16}
        >
          <Grid item sm={6} xs={12}>
            <Typography
              variant="h6"
              align="center"
              component="h2"
              gutterBottom
            >
              Vous souhaitez organiser un atelier
            </Typography>
            <Typography variant="body1" align="center">
              A la recherche d’une activité fédératrice, propice à la cohésion d’équipe et au partage ? Enfilez le tablier avec vos collaborateurs et rejoignez nos cuistots passionnés aux fourneaux. Nos ateliers laissent place à la collaboration et encouragent l’esprit d’équipe et la créativité. Chaque atelier se termine par la dégustation des préparations autour d’un buffet convivial, voir d’un repas.
            </Typography>
            <Grid container alignItems="center" justify="center">
              <Button variant="outlined" color="primary">En savoir plus</Button>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Grid container justify="center">
              <img
                className={classes.image}
                alt="Atelier Cuistot du Coin"
                src="https://static.cuistotducoin.com/img/business/passez-a-table.jpg"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          className={classes.grid}
          spacing={16}
        >
          <Grid item sm={6} xs={12}>
            <Grid container justify="center">
              <img
                className={classes.image}
                alt="Atelier Cuistot du Coin"
                src="https://static.cuistotducoin.com/img/business/organisez.jpg"
              />
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography
              variant="h6"
              align="center"
              component="h2"
              gutterBottom
            >
              Vous souhaitez organiser un buffet
            </Typography>
            <Typography variant="body1" align="center">
              A l’issue d’une réunion d’équipe, lors d’un séminaire, à l’occasion d’une rencontre entre collaborateurs, vous recherchez une formule de repas qui allie originalité, simplicité et convivialité. Nos buffets sont une invitation au voyage : découvrez des saveurs d’ici et d’ailleurs au travers de recettes authentiques.
            </Typography>
            <Grid container alignItems="center" justify="center">
              <Button variant="outlined" color="primary">En savoir plus</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          className={classes.grid}
          spacing={16}
        >
          <Grid item sm={6} xs={12}>
            <Typography
              variant="h6"
              align="center"
              component="h2"
              gutterBottom
            >
              Vous souhaitez organiser une journée de travail conviviale
            </Typography>
            <Typography variant="body1" align="center">
              ...
            </Typography>
            <Grid container alignItems="center" justify="center">
              <Button variant="outlined" color="primary">En Savoir plus</Button>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Grid container justify="center">
              <img
                className={classes.image}
                alt="Atelier Cuistot du Coin"
                src="https://static.cuistotducoin.com/img/business/passez-a-table.jpg"
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          align="center"
          component="h2"
          gutterBottom
        >
          Plutôt atelier de cuisine ou repas ? Il y en a pour tous les goûts !
        </Typography>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          {typeActivity.map((activity, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Grid container>
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
          variant="h6"
          align="center"
          component="h2"
          gutterBottom
        >
          Notre recette ?
        </Typography>
        <Grid
          container
          justify="space-around"
          spacing={16}
          className={classes.grid}
        >
          <Grid item xs={12} sm={4}>
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography variant="subtitle1">A votre écoute</Typography>
              <Typography variant="body1">
                Faîtes-nous part de vos besoins et de vos envies.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography variant="subtitle1">
                Une diversité de saveurs
              </Typography>
              <Typography variant="body1">
                Nous sélectionnons nos ateliers et nos repas les mieux adaptés
                et définissons ensemble leurs modalités.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid
              container
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography variant="subtitle1">
                On s’occupe de tout
              </Typography>
              <Typography variant="body1">
                Repas et ateliers sont organisés de A à Z par nos soins. Enfilez
                le tablier ou passez à table: il n’y a plus qu’à déguster!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          align="center"
          component="h2"
          gutterBottom
        >
          C’est parti pour le voyage des papilles !
        </Typography>
        <Grid container className={classes.grid}>
          <Typography variant="body1" paragraph>
            Passionnés de cuisine, nos Cuistots ont à cœur de partager leurs
            savoir-faire et leurs recettes authentiques, mais surtout de vous
            faire découvrir leurs univers ! Ils vous invitent à vivre une
            expérience culinaire inédite au sein de votre entreprise ou dans
            l’un de nos lieux partenaires le temps d’un atelier culinaire ou
            d’un repas savoureux
          </Typography>
        </Grid>
        <Typography
          variant="h6"
          align="center"
          component="p"
          gutterBottom
        >
          A vous de choisir votre destination !
        </Typography>
        <Typography
          variant="h6"
          align="center"
          component="p"
          gutterBottom
        >
          Ils ont voyagé aux côtés de nos Cuistots
        </Typography>
        <Grid
          container
          justify="space-around"
          spacing={16}
          className={classes.grid}
        >
          <Grid item xs={12}>
            <Typography variant="body1">
              Ils ont participez à nos ateliers, déjeunez aux cotés de nos
              Cuistots, pour renforcez les liens de leurs salariés, récompensez
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
          variant="h6"
          align="center"
          component="p"
          gutterBottom
        >
          Réservez votre billet et embarquez en équipe pour un savoureux voyage
          culinaire !
        </Typography>
        <Grid
          container
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
      </Layout>
    );
  }
}

export default withStyles(styles as any)(Business as any) as any;
