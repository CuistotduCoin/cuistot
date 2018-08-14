import * as content from "!raw-loader!content/presskit.md";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import MarkdownElement from "components/MarkdownElement";
import React from "react";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface IPresskitProps {
  classes?: any;
}

export class Presskit extends React.Component<IPresskitProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Head
          title={metaInfo.metaInfo.presskit.title}
          description={metaInfo.metaInfo.presskit.description}
        />
        <Header />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <MarkdownElement text={content} />
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Presskit as any) as any;
