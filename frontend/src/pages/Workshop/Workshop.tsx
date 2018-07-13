import Avatar from "@material-ui/core/Avatar";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Cover from "components/Cover";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({
  avatar: {
    backgroundColor: green[500],
    height: 60,
    width: 60
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface IWorkshopProps {
  classes?: any;
}

export class Workshop extends React.Component<IWorkshopProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header static={true} />
        <Cover imageURL="https://picsum.photos/1000/300/?random" />
        <Grid
          container={true}
          alignItems="center"
          className={classes.grid}
          spacing={16}
        >
          <Grid item={true} xs={9}>
            <Grid container={true} alignItems="center" spacing={16} />
            <Grid item={true} xs={9}>
              <Typography
                variant="title"
                align="center"
                component="h2"
                gutterBottom={true}
              >
                Atelier sushis, makis et témaris
              </Typography>
            </Grid>
            <Grid item={true} xs={3}>
              <Grid container={true} justify="center">
                <Avatar
                  className={classes.avatar}
                  src="https://picsum.photos/40/40/?random"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Workshop as any) as any;
