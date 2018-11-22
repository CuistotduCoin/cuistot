import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import Layout from "../../components/Layout";

const styles = (theme: Theme) => ({
  card: {
    width: 300
  },
  cardHeader: {
    background: "rgba(0, 0, 0, 0.4)",
    color: "fff",
    height: 60,
    marginTop: -60
  },
  cardShortContent: {
    height: 80
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  media: {
    height: 135
  },
  title: {
    color: "white"
  },
  typography: {
    marginTop: 15
  }
});

export interface IIndividualProps {
  classes?: any;
}

export class Individual extends React.Component<IIndividualProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Layout
        valueProposition="Participez à des ateliers de cuisine authentiques et en toute convivialité !"
        description="Ateliers de Cuisine, Dégustations, Repas authentiques et conviviaux"
        showSearchForm={true}
      >
        -
      </Layout>
    );
  }
}

export default withStyles(styles as any)(Individual as any) as any;
