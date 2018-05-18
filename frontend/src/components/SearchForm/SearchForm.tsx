import { Theme, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import React, { Component } from "react";

const styles = (theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

interface ISearchForm {
  classes?: any;
}

export class SearchForm extends Component<ISearchForm, {}> {
  public render() {
    const { classes } = this.props;

    return <div />;
  }
}

export default withStyles(styles as any)(SearchForm as any) as any;
