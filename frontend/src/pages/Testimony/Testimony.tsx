import * as content from "!raw-loader!content/testimony.md";
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

interface ITestimonyProps {
  classes?: any;
}

export class Testimony extends React.Component<ITestimonyProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Layout valueProposition="Ils nous font confiance">
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

export default withStyles(styles as any)(Testimony as any) as any;
