import * as content from "!raw-loader!content/join.md";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
// @ts-ignore
import MarkdownElement from "@material-ui/docs/MarkdownElement";
import Layout from "components/Layout";
import React from "react";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface IJoinProps {
  classes?: any;
}

export class Join extends React.Component<IJoinProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Layout
        pageName="join"
        valueProposition="Rejoignez l'équipe de Cuistot du Coin"
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

export default withStyles(styles as any)(Join as any) as any;
