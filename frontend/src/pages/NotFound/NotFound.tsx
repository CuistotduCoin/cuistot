import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";

const styles = (theme: Theme) => ({});

interface INotFoundProps {
  classes?: any;
}

export class NotFound extends React.Component<INotFoundProps, {}> {
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

export default withStyles(styles as any)(NotFound as any) as any;
