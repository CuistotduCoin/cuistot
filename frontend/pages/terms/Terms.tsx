import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
<<<<<<< HEAD:frontend/src/pages/Terms/Terms.tsx
import Layout from "components/Layout";
import MarkdownElement from "components/MarkdownElement";
=======
>>>>>>> 20c8bd36da7ff5ae1174a885a59d9dade7abc438:frontend/pages/terms/Terms.tsx
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import components from "../../content/components";
// @ts-ignore
import Content from "../../content/terms.mdx";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  }
});

interface ITermsProps {
  classes?: any;
}

export class Terms extends React.Component<ITermsProps, {}> {
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
          <Content components={components} />
        </Grid>
      </Layout>
    );
  }
}

export default withStyles(styles as any)(Terms as any) as any;
