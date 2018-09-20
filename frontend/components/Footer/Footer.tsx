import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
              <Typography component="p" variant={"headline"} color="primary">
                Cuistot du Coin
              </Typography>
              <Link href="/team">
                <a className={classes.link}>
                  <Typography color="primary">L'équipe</Typography>
                </a>
              </Link>
              <Link href="/mission">
                <a className={classes.link}>
                  <Typography color="primary">Notre mission</Typography>
                </a>
              </Link>
              <Link href="/join">
                <a className={classes.link}>
                  <Typography color="primary">Nous rejoindre</Typography>
                </a>
              </Link>
              <Link href="/presskit">
                <a className={classes.link}>
                  <Typography color="primary">Contact & Presse</Typography>
                </a>
              </Link>
              <Link href="/terms">
                <a className={classes.link}>
                  <Typography color="primary">Conditions légales</Typography>
                </a>
              </Link>
              <a
                className={classes.link}
                href="http://www.blog.cuistotducoin.com"
                target="_blank"
              >
                <Typography color="primary">Blog</Typography>
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
              <Typography component="p" variant={"headline"} color="primary">
                Gourmets
              </Typography>
              <Link href="/subscription">
                <a className={classes.link}>
                  <Typography color="primary">Abonnement</Typography>
                </a>
              </Link>
              <Link href="/how-it-works#pour-les-gourmets">
                <a className={classes.link}>
                  <Typography color="primary">Comment ça marche</Typography>
                </a>
              </Link>
              <Link href="/testimony">
                <a className={classes.link}>
                  <Typography color="primary">Temoignages</Typography>
                </a>
              </Link>
              <Link href="/gift">
                <a className={classes.link}>
                  <Typography color="primary">Offrir</Typography>
                </a>
              </Link>
              <Link href="/invite">
                <a className={classes.link}>
                  <Typography color="primary">Parrainage</Typography>
                </a>
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
              <Typography component="p" variant={"headline"} color="primary">
                Cuistots
              </Typography>
              <Link href="/how-it-works#pour-les-cuistots">
                <a className={classes.link}>
                  <Typography color="primary">Comment ça marche</Typography>
                </a>
              </Link>
              <Link href="/testimony">
                <a className={classes.link}>
                  <Typography color="primary">Temoignages</Typography>
                </a>
              </Link>
              <Link href="/organize">
                <a className={classes.link}>
                  <Typography color="primary">Devenir Cuistot</Typography>
                </a>
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
              <Typography component="p" variant={"headline"} color="primary">
                Entreprises
              </Typography>
              <Link href="/how-it-works#pour-les-entreprises">
                <a className={classes.link}>
                  <Typography color="primary">Comment ça marche</Typography>
                </a>
              </Link>
              <Link href="/testimony">
                <a className={classes.link}>
                  <Typography color="primary">Temoignages</Typography>
                </a>
              </Link>
              <Link href="/invite-business">
                <a className={classes.link}>
                  <Typography color="primary">Parrainage</Typography>
                </a>
              </Link>
              <Link href="/terms-pro">
                <a className={classes.link}>
                  <Typography color="primary">Conditions légales</Typography>
                </a>
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
              <Typography component="p" variant={"headline"} color="primary">
                Partenaires
              </Typography>
              <Link href="/how-it-works#pour-les-partenaires">
                <a className={classes.link}>
                  <Typography color="primary">Comment ça marche</Typography>
                </a>
              </Link>
              <Link href="/testimony">
                <a className={classes.link}>
                  <Typography color="primary">Temoignages</Typography>
                </a>
              </Link>
              <Link href="/invite-business">
                <a className={classes.link}>
                  <Typography color="primary">Devenir partenaires</Typography>
                </a>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles as any)(Footer as any) as any;
