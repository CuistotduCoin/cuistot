import * as content from "!raw-loader!content/organize.md";
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

interface IOrganizeProps {
  classes?: any;
}

export class Organize extends React.Component<IOrganizeProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Layout
        pageName="organize"
        valueProposition="Devenir cuistot avec Cuistot du Coin"
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

export default withStyles(styles as any)(Organize as any) as any;
