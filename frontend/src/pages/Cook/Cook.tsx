import { withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";

const styles = () => ({});

interface ICookProps {
  classes?: any;
}

export class Cook extends React.Component<ICookProps, {}> {
  public render() {
    return (
      <>
        <Header />
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Cook as any) as any;
