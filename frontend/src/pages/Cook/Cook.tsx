import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({});

interface ICookProps {
  classes?: any;
}

export class Cook extends React.Component<ICookProps, {}> {
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

export default withStyles(styles as any)(Cook as any) as any;
