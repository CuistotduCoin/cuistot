import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import MetaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({});

interface IGiftProps {
  classes?: any;
}

export class Gift extends React.Component<IGiftProps, {}> {
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

export default withStyles(styles as any)(Gift as any) as any;
