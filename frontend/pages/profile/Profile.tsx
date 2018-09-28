import { withStyles } from "@material-ui/core/styles";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const styles = () => ({});

interface IProfilProps {
  classes?: any;
}

export class Profil extends React.Component<IProfilProps, {}> {
  public render() {
    return (
      <>
        <Header />
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Profil as any) as any;
