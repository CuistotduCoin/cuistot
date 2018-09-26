import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from 'mdi-material-ui/Facebook';
import InstagramIcon from 'mdi-material-ui/Instagram';
import TwitterIcon from 'mdi-material-ui/Twitter';
import Link from "next/link";
import React from "react";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  link: {
    textDecoration: "none"
  },
  root: {
    backgroundColor: grey[900]
  },
  title: {
    marginBottom: '1.5rem',
    opacity: '0.85'
  },
  subheading: {
    marginBottom: '0.3rem',
    color: 'white',
    fontSize: '0.8rem'
  },
  icons: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '20px',
    "& a": {
      color: 'white',
      marginRight: '10px'
    }
  }
});

export interface IFooterProps {
  classes?: any;
}

export class Footer extends React.Component<IFooterProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container={true} justify="space-around" className={classes.grid}>
          <Grid item={true}>
            <Grid
              container={true}
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography component="p" variant="title" className={classes.title} color="primary">
                Cuistot du Coin
              </Typography>
              <Link href="/team">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>L'équipe</Typography></a>
              </Link>
              <Link href="/mission">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Notre mission</Typography></a>
              </Link>
              <Link href="/join">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Nous rejoindre</Typography></a>
              </Link>
              <Link href="/presskit">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Contact & Presse</Typography></a>
              </Link>
              <Link href="/terms">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Conditions légales</Typography></a>
              </Link>
              <a className={classes.link} href="http://www.blog.cuistotducoin.com" target="_blank">
                <Typography variant="subheading" className={classes.subheading}>Blog</Typography>
              </a>
            </Grid>
          </Grid>
          <Grid item={true}>
            <Grid
              container={true}
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography component="p" variant="title" className={classes.title} color="primary">
                Gourmets
              </Typography>
              <Link href="/subscription">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Abonnement</Typography></a>
              </Link>
              <Link href="/how-it-works#pour-les-gourmets">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Comment ça marche</Typography></a>
              </Link>
              <Link href="/testimony">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Temoignages</Typography></a>
              </Link>
              <Link href="/gift">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Offrir</Typography></a>
              </Link>
              <Link href="/invite">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Parrainage</Typography></a>
              </Link>
            </Grid>
          </Grid>
          <Grid item={true}>
            <Grid
              container={true}
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography component="p" variant="title" className={classes.title} color="primary">
                Cuistots
              </Typography>
              <Link href="/how-it-works#pour-les-cuistots">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Comment ça marche</Typography></a>
              </Link>
              <Link href="/testimony">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Temoignages</Typography></a>
              </Link>
              <Link href="/become-cook">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Devenir Cuistot</Typography></a>
              </Link>
            </Grid>
          </Grid>
          <Grid item={true}>
            <Grid
              container={true}
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography component="p" variant="title" className={classes.title} color="primary">
                Entreprises
              </Typography>
              <Link href="/how-it-works#pour-les-entreprises">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Comment ça marche</Typography></a>
              </Link>
              <Link href="/testimony">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Temoignages</Typography></a>
              </Link>
              <Link href="/invite-business">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Parrainage</Typography></a>
              </Link>
              <Link href="/terms-pro">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Conditions légales</Typography></a>
              </Link>
            </Grid>
          </Grid>
          <Grid item={true}>
            <Grid
              container={true}
              justify="space-between"
              alignItems="flex-start"
              direction="column"
            >
              <Typography component="p" variant="title" className={classes.title} color="primary">
                Partenaires
              </Typography>
              <Link href="/how-it-works#pour-les-partenaires">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Comment ça marche</Typography></a>
              </Link>
              <Link href="/testimony">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Temoignages</Typography></a>
              </Link>
              <Link href="/invite-business">
                <a className={classes.link}><Typography variant="subheading" className={classes.subheading}>Devenir partenaires</Typography></a>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.icons}>
          <a href="https://www.facebook.com/cuistotducoin/" target="_blank"><FacebookIcon /></a>
          <a href="https://twitter.com/cuistotducoin?lang=fr" target="_blank"><TwitterIcon /></a>
          <a href="https://www.instagram.com/cuistotducoin/" target="_blank"><InstagramIcon /></a>
        </div>
      </div>
    );
  }
}

export default withStyles(styles as any)(Footer as any) as any;