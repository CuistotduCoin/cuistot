import grey from "@material-ui/core/colors/grey";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: "1080px",
    padding: "24px"
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

export class Footer extends Component<IFooterProps, {}> {
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
              <Typography variant={"headline"} color="primary">
                Cuistot du Coin
              </Typography>
              <Link to="/team" className={classes.link}>
                <Typography color="primary">L'équipe</Typography>
              </Link>
              <Link to="/mission" className={classes.link}>
                <Typography color="primary">Notre mission</Typography>
              </Link>
              <Link to="/join" className={classes.link}>
                <Typography color="primary">Nous rejoindre</Typography>
              </Link>
              <Link to="/presskit" className={classes.link}>
                <Typography color="primary">Contact & Presse</Typography>
              </Link>
              <Link to="/legal" className={classes.link}>
                <Typography color="primary">Condition légale</Typography>
              </Link>
              <a
                className={classes.link}
                href="http://www.blog.cuistotducoin.com"
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
              <Typography variant={"headline"} color="primary">
                Gourmet
              </Typography>
              <Link to="/how-it-works" className={classes.link}>
                <Typography color="primary">Comment ça marche</Typography>
              </Link>
              <Link to="/testimony" className={classes.link}>
                <Typography color="primary">Temoignages</Typography>
              </Link>
              <Link to="/gift" className={classes.link}>
                <Typography color="primary">Offrir</Typography>
              </Link>
              <Link to="/invite" className={classes.link}>
                <Typography color="primary">Parrainage</Typography>
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
              <Typography variant={"headline"} color="primary">
                Cuistot
              </Typography>
              <Link to="/how-it-works" className={classes.link}>
                <Typography color="primary">Comment ça marche</Typography>
              </Link>
              <Link to="/testimony" className={classes.link}>
                <Typography color="primary">Temoignages</Typography>
              </Link>
              <Link to="/organize" className={classes.link}>
                <Typography color="primary">Devenir partenaire</Typography>
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
              <Typography variant={"headline"} color="primary">
                Entreprise
              </Typography>
              <Link to="/how-it-works" className={classes.link}>
                <Typography color="primary">Comment ça marche</Typography>
              </Link>
              <Link to="/testimony" className={classes.link}>
                <Typography color="primary">Temoignages</Typography>
              </Link>
              <Link to="/invite-business" className={classes.link}>
                <Typography color="primary">Parrainage</Typography>
              </Link>
              <Link to="/legal" className={classes.link}>
                <Typography color="primary">Conditions légales</Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles as any)(Footer as any) as any;
