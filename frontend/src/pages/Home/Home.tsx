import { Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import Hero from "components/Hero";
import React from "react";
import InstagramEmbed from "react-instagram-embed";
import { Link } from "react-router-dom";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  avatar: {
    height: 80,
    margin: 8,
    width: 80
  },
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
  gridWithoutPadding: {
    margin: "0px auto",
    maxWidth: 1080
  },
  image: {
    padding: 16
  },
  imageTile: {
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
  history: any;
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

    return (
      <>
        <Head
          title={metaInfo.metaInfo.home.title}
          description={metaInfo.metaInfo.home.description}
        />
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Faîtes voyager vos papilles et ouvrez-vous à de nouvelles cultures par le biais de la cuisine aux côtés de nos Cuistots"
          description="Ateliers de Cuisine, Buffets cocktail authentiques et conviviaux"
        />
        <Grid container={true} alignItems="center" className={classes.gridTile}>
          <Grid item={true} xs={12} sm={6}>
            <Grid container={true} className={classes.tileEntreprise}>
              <div className={classes.block}>
                <img
                  src="https://static.cuistotducoin.com/img/home/business.jpg"
                  alt={"Entreprise"}
                  className={classes.imageTile}
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
                  src="https://static.cuistotducoin.com/img/home/individual.jpg"
                  alt={"Particulier"}
                  className={classes.imageTile}
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
          variant="headline"
          align="center"
          component="h2"
          gutterBottom={true}
          className={classes.typography}
        >
          Cuistot du Coin, le renouveau du traiteur événementiel à Brest
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          spacing={16}
          className={classes.grid}
        >
          <Grid container={true} xs={12} sm={7} justify="center">
            <img
              src="https://static.cuistotducoin.com/img/home/buffet.jpg"
              alt="buffet"
              height={270}
              width={480}
              className={classes.image}
            />
          </Grid>
          <Grid
            xs={12}
            sm={5}
            container={true}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant={"title"} component="h3" gutterBottom={true}>
              Des ateliers et des buffets
            </Typography>
            <Typography variant={"body1"} paragraph={true}>
              Pour vos événements privés ou professionnels, nous vous régalerons
              avec des ateliers de cuisine conviviaux ou encore des buffets
              cocktails délicieux !
            </Typography>
            <Typography variant={"body1"} paragraph={true}>
              Parce que le voyage commence d’abord dans l’assiette, découvrez
              une cuisine qui invite à l’évasion et percez les secrets des
              recettes de nos Cuistots passionnés.
            </Typography>
          </Grid>
          <Grid
            xs={12}
            sm={5}
            container={true}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant={"title"} component="h3" gutterBottom={true}>
              Nos Cuistots
            </Typography>
            <Typography variant={"body1"} paragraph={true} align="justify">
              Nous ne travaillons exclusivement qu'avec des traiteurs
              indépendants qu'on appelle nos cuistots ! Nos cuistots assurent
              des prestations authentiques et conviviales, à partir de produits
              frais et fait main.
            </Typography>
            <Typography variant={"body1"} paragraph={true} align="justify">
              Cela vous permet d'explorer une diversité d'univers culinaires
              pour toujours surprendre et satisfaire vos papilles !
            </Typography>
          </Grid>
          <Grid container={true} xs={12} sm={7} justify="center">
            <img
              src="https://static.cuistotducoin.com/img/home/atelier-produits-frais.jpg"
              alt="Ateliers autour de produits frais"
              height={270}
              width={480}
              className={classes.image}
            />
          </Grid>
          <Grid container={true} xs={12} sm={7} justify="center">
            <img
              src="https://static.cuistotducoin.com/img/home/communauté.jpg"
              alt="Notre communauté de cuistots"
              height={270}
              width={480}
              className={classes.image}
            />
          </Grid>
          <Grid
            xs={12}
            sm={5}
            container={true}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Typography variant={"title"} component="h3" gutterBottom={true}>
              Une communauté
            </Typography>
            <Typography variant={"body1"} paragraph={true} align="justify">
              Tous nos partenaires (métiers de bouche, lieux atypiques, artisans
              et de commerçants passionnés) collaboreront autour de votre
              événement pour le rentre unique.
            </Typography>
            <Typography variant={"body1"} paragraph={true} align="justify">
              Notre technologie et notre équipe à votre service pour vous
              accompagner avant, pendant et après chaque prestation.
            </Typography>
          </Grid>
          <Typography
            variant="headline"
            align="center"
            component="h2"
            gutterBottom={true}
            className={classes.typography}
          >
            Ils nous font confiance
          </Typography>
          <Grid
            container={true}
            alignItems="center"
            className={classes.gridTile}
          >
            <img
              alt="Séverine Gey, Crédit Mutuel Arkea"
              src="https://static.cuistotducoin.com/img/business/participants/arkea.jpg"
              height={80}
              width={80}
            />
            <Typography variant="subheading" paragraph={true}>
              Séverine Gey, responsable du comité d'entreprise du Crédit Mutuel
              Arkea
            </Typography>
            <Typography variant="body1" paragraph={true} align="justify">
              L'équipe a apprécié toutes les prestations de Cuistot du coin. Le
              buffet : original et très bon et l'atelier : ambiance détendue où
              chacun a trouvé sa place. Le lieu où se sent vite très bien. Merci
              pour cette respiration.
            </Typography>
            <Avatar
              alt="Lucile Landoin"
              src="https://static.cuistotducoin.com/img/home/lucile.jpg"
              className={classes.avatar}
            />
            <Typography variant="subheading" paragraph={true}>
              Lucile Landoin, gourmet de l'atelier végétal : makis et rolls
            </Typography>
            <Typography variant="body1" paragraph={true}>
              Cuistot du coin a trouvé le concept parfait pour passer un bon
              moment en cuisinant ! Convivial et super pratique pour avoir des
              conseils de cuisine, je le recommande vivement
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="headline"
          align="center"
          component="h2"
          gutterBottom={true}
          className={classes.typography}
        >
          Vous voulez en voir plus ?
        </Typography>
        <Grid
          container={true}
          justify="space-around"
          spacing={16}
          className={classes.gridWithoutPadding}
        >
          <Grid item={true} sm={12} md={6} lg={4} justify="space-around">
            <InstagramEmbed
              url="https://instagr.am/p/Bo1RaKUle_4/"
              hideCaption={true}
              containerTagName="div"
              maxWidth={320}
            />
          </Grid>
          <Grid item={true} sm={12} md={6} lg={4} justify="space-around">
            <InstagramEmbed
              url="https://instagr.am/p/Blk5LAND9Xf/"
              hideCaption={true}
              containerTagName="div"
              maxWidth={320}
            />
          </Grid>
          <Grid item={true} sm={12} md={6} lg={4} justify="space-around">
            <InstagramEmbed
              url="https://instagr.am/p/Bo9DdGYlUEl/"
              hideCaption={true}
              containerTagName="div"
              maxWidth={320}
            />
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Home as any) as any;
