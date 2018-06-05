import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({});

interface ITeamProps {
  classes?: any;
}

export class Team extends React.Component<ITeamProps, {}> {
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

export default withStyles(styles as any)(Team as any) as any;
