import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({});

interface ITestimonyProps {
  classes?: any;
}

export class Testimony extends React.Component<ITestimonyProps, {}> {
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

export default withStyles(styles as any)(Testimony as any) as any;
