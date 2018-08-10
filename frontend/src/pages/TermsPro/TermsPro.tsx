import * as content from "!raw-loader!content/terms-pro.md";
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

interface ITermsProProps {
  classes?: any;
}

export class TermsPro extends React.Component<ITermsProProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Layout valueProposition="Conditions légales">
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

export default withStyles(styles as any)(TermsPro as any) as any;
