import { Theme, withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const styles = (theme: Theme) => ({});

interface IInviteProps {
  classes?: any;
}

export class Invite extends React.Component<IInviteProps, {}> {
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

export default withStyles(styles as any)(Invite as any) as any;
