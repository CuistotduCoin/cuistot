import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";

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

export class SearchForm extends React.Component<ISearchForm, {}> {
  public render() {
    return <div />;
  }
}

export default withStyles(styles as any)(SearchForm as any) as any;
