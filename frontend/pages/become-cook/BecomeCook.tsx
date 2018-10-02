import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import { compose } from "recompose";
import Layout from "../../components/Layout";
import Logo from "../../components/Logo";
import components from "../../content/components";
// @ts-ignore
import Content from "../../content/organize.mdx";

const styles = (theme: Theme) => ({
  container: {
    textAlign: "center"
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  logo: {
    marginTop: 3 * theme.spacing.unit
  }
});

// tslint:disable-next-line
const BecomeCook: React.SFC<{ classes: any }> = ({ classes }) => (
  <Layout className={classes.container}>
    <Logo height={100} width={100} className={classes.logo} />
    <Grid
      container
      justify="space-around"
      alignItems="center"
      spacing={16}
      className={classes.grid}
    >
      <Content components={components} />
    </Grid>
  </Layout>
);

const enhance = compose(
  withStyles(styles as any),
);

export default enhance(BecomeCook);
