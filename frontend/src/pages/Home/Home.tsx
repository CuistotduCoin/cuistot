import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import Layout from "components/Layout";
import { GetWorkshops } from "queries";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const styles = (theme: Theme) => ({
  block: {
    height: "100%",
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
    maxWidth: 950,
    paddingBottom: 75,
    width: "calc(100% - 120px)"
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

    const partners = [
      {
        image: "https://static.cuistotducoin.com/img/home/partners/amaiur.jpg",
        name: "amaiur"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/arthur-bonnet.jpg",
        name: "Arthur Bonnet"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/c-chocolat.jpg",
        name: "C chocolat"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/couleurs-cuisines.jpg",
        name: "Couleurs Cuisines"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/cuisinella.jpg",
        name: "cuisinella"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/palais-des-thes.jpg",
        name: "Palais des thes"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/roi-de-bretagne.jpg",
        name: "Roi de Bretagne"
      },
      {
        image: "https://static.cuistotducoin.com/img/home/partners/schmidt.jpg",
        name: "Schmidt"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/soif-de-vins.jpg",
        name: "Soif de vins"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/the-corner.jpg",
        name: "The corner"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/tot-ou-tard.jpg",
        name: "Tot ou tard"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/partners/tuk-tuk-bazar.jpg",
        name: "Tuk Tuk Bazar"
      }
    ];

    const participants = [
      {
        image:
          "https://static.cuistotducoin.com/img/home/participants/arkea.jpg",
        name: "arkea"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/participants/brest-metropole.jpg",
        name: "brest metropole et ville"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/participants/cadiou.jpg",
        name: "cadiou"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/participants/fortuneo.jpg",
        name: "fortuneo"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/participants/gl-events.jpg",
        name: "gl events"
      },
      {
        image:
          "https://static.cuistotducoin.com/img/home/participants/hippocampe.jpg",
        name: "hippocampe"
      }
    ];

    return (
      <Connect query={graphqlOperation(GetWorkshops)}>
        {({ data }) => (
          <Layout
            pageName="home"
            valueProposition="Faîtes voyager vos papilles et ouvrez-vous à de nouvelles cultures par le biais de la cuisine aux côtés de nos Cuistots"
            description="Ateliers de Cuisine, Dégustations, Repas authentiques et conviviaux"
          >
            <Grid
              container={true}
              alignItems="center"
              className={classes.gridTile}
            >
              <Grid item={true} xs={12} sm={6}>
                <Grid container={true} className={classes.tileEntreprise}>
                  <div className={classes.block}>
                    <img
                      src="https://static.cuistotducoin.com/img/home/business.jpg"
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
                            Vous êtes une entreprise
                          </Typography>
                          <Typography
                            variant="body2"
                            align="center"
                            component="p"
                            className={classes.tileSubtitle}
                          >
                            Concoctez avec nous une expérience culinaire
                            authentique et gourmande pour vos salariés !
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
                      src="https://static.cuistotducoin.com/img/home/individual.jpg"
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
                            Vous êtes un particulier
                          </Typography>
                          <Typography
                            variant="body2"
                            align="center"
                            component="p"
                            className={classes.tileSubtitle}
                          >
                            Participez à des ateliers de cuisine authentiques et
                            en toute convivialité !
                          </Typography>
                        </Grid>
                      </div>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Typography
              variant="headline"
              align="center"
              component="h2"
              gutterBottom={true}
              className={classes.typography}
            >
              Ateliers, dégustations ou repas, retrouvez nos ingrédients clés :
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
                  <Typography
                    variant={"title"}
                    component="h3"
                    gutterBottom={true}
                  >
                    Authenticité et Convivialité
                  </Typography>
                  <Typography variant={"body1"}>
                    Parce que le voyage commence d’abord dans l’assiette,
                    découvrez une cuisine qui invite à l’évasion et percez les
                    secrets des recettes de nos Cuistots passionnés.
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
                  <Typography
                    variant={"title"}
                    component="h3"
                    gutterBottom={true}
                  >
                    Partage
                  </Typography>
                  <Typography variant={"body1"}>
                    Au-delà de la cuisine, plongez dans les univers de nos
                    Cuistots et découvrez de nouveaux horizons.
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
                  <Typography
                    variant={"title"}
                    component="h3"
                    gutterBottom={true}
                  >
                    Diversité
                  </Typography>
                  <Typography variant={"body1"}>
                    Divers formats et univers culinaires sont proposés chez
                    Cuistot du Coin. De quoi satisfaire vos papilles !
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
                  révéler. Nous nous sommes entourés d’artisans et de
                  commerçants passionnés pour vous offrir des expériences
                  culinaires sur-mesure.
                </Typography>
              </Grid>
            </Grid>

            <div className={classes.slider}>
              <Slider {...sliderSettings}>
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
          </Layout>
        )}
      </Connect>
    );
  }
}

export default withStyles(styles as any)(Home as any) as any;
