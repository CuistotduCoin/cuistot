import { Theme, withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const styles = (theme: Theme) => ({});

interface IProfilProps {
  classes?: any;
}

export class Profil extends React.Component<IProfilProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Profil as any) as any;