import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({});

interface IPresskitProps {
  classes?: any;
}

export class Presskit extends React.Component<IPresskitProps, {}> {
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

export default withStyles(styles as any)(Presskit as any) as any;
