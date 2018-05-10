import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import { Theme, withStyles } from "material-ui/styles";
import React, { Component } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import logo from "./react.svg";

const styles = (theme: Theme) => ({
  gridList: {
    transform: "translateZ(0)"
  },
  image: {
    opacity: "0.5"
  },
  tileBar: {
    height: "100%",
    textAlign: "center",
    transition: "all 0.2s ease"
  },
  tileEntreprise: { backgroundColor: "#e84a4c" },
  tileParticulier: { backgroundColor: "#47b8b2" }
});

interface IHomeProps {
  classes?: any;
}

export class Home extends React.Component<IHomeProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Hero
          imageURL="https://picsum.photos/700/400/?random"
          videoURL="http://thenewcode.com/assets/videos/polina.mp4"
        />
        <GridList className={classes.gridList} cols={2} spacing={0}>
          <GridListTile className={classes.tileEntreprise}>
            <img
              src="https://picsum.photos/300/200/?random"
              alt={"Entreprise"}
              className={classes.image}
            />
            <GridListTileBar
              titlePosition="top"
              title="Vous êtes une entreprise"
              className={classes.tileBar}
            />
          </GridListTile>
          <GridListTile className={classes.tileParticulier}>
            <img
              src="https://picsum.photos/300/200/?random"
              alt={"Particulier"}
              className={classes.image}
            />
            <GridListTileBar
              titlePosition="top"
              title="Vous êtes un particulier"
              className={classes.tileBar}
            />
          </GridListTile>
        </GridList>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Home as any) as any;
