import * as content from "!raw-loader!content/organize.md";
import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import { compose } from "recompose";
import BecomeCookForm from "../../components/BecomeCookForm";
import Layout from "../../components/Layout";
import Logo from "../../components/Logo";
import MarkdownElement from "../../components/MarkdownElement";

const styles = (theme: Theme) => ({
  container: {
    textAlign: "center"
  },
  logo: {
    marginTop: 3 * theme.spacing.unit
  },
  text: {
    margin: '0 auto',
    width: '60%',
    color: theme.palette.text.secondary
  }
});

// tslint:disable-next-line
const BecomeCook: React.SFC<{ classes: any }> = ({ classes }) => (
  <Layout className={classes.container}>
    <Logo height={100} width={100} className={classes.logo} />
    <MarkdownElement text={content} className={classes.text} />
    <BecomeCookForm />
  </Layout>
);

const enhance = compose(withStyles(styles as any));

export default enhance(BecomeCook);
