import * as content from "!raw-loader!content/mission.md";
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

interface IMissionProps {
  classes?: any;
}

export class Mission extends React.Component<IMissionProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Layout
        pageName="mission"
        valueProposition="Nos mission à Cuistot du Coin"
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

export default withStyles(styles as any)(Mission as any) as any;
