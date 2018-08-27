import { withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";

const styles = () => ({});

interface ISearchProps {
  classes?: any;
}

export class Search extends React.Component<ISearchProps, {}> {
  public render() {
    return (
      <>
        <Header />
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Search as any) as any;
