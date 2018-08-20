import * as content from "!raw-loader!content/team.md";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Layout from "components/Layout";
import MarkdownElement from "components/MarkdownElement";
import React from "react";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface ITeamProps {
  classes?: any;
}

export class Team extends React.Component<ITeamProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Layout
        pageName="team"
        valueProposition="Qui sommes-nous ? l'équipe de Cuistot du Coin"
      >
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <MarkdownElement text={content} />
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(styles as any)(Team as any) as any;
