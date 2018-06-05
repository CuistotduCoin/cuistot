import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({});

interface IOrganizeProps {
  classes?: any;
}

export class Organize extends React.Component<IOrganizeProps, {}> {
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

export default withStyles(styles as any)(Organize as any) as any;
