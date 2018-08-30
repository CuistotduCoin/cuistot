import { Theme, withStyles } from "@material-ui/core/styles";
import AlgoliaPlaces from "algolia-places-react";
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
  appId: string;
  apiKey: string;
  history: any;
}

export class SearchForm extends React.Component<ISearchForm, {}> {
  constructor(props: ISearchForm) {
    super(props);
    this.handleAddressSelection = this.handleAddressSelection.bind(this);
  }

  public handleAddressSelection({ suggestion }) {
    this.props.history.push(
      "/s/" +
        suggestion.name +
        "?lat=" +
        suggestion.latlng.lat +
        "&lon=" +
        suggestion.latlng.lng
    );
  }

  public render() {
    return (
      <AlgoliaPlaces
        placeholder="Entrez votre ville"
        options={{
          apiKey: this.props.apiKey,
          appId: this.props.appId,
          countries: ["fr", "be", "ch"],
          language: "fr",
          type: "city",
          useDeviceLocation: true
        }}
        onChange={this.handleAddressSelection}
      />
    );
  }
}

export default withStyles(styles as any)(SearchForm as any) as any;
