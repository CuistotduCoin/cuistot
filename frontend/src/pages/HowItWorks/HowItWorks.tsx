import * as content from "!raw-loader!content/howitworks.md";
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

interface IHowItWorksProps {
  classes?: any;
}

export class HowItWorks extends React.Component<IHowItWorksProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <Layout pageName="howitworks" valueProposition="Comment ça marche ?">
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

export default withStyles(styles as any)(HowItWorks as any) as any;
