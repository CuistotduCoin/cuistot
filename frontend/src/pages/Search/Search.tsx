import { FormControlLabel, Switch } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Footer from "components/Footer";
import Header from "components/Header";
import Hero from "components/Hero/Hero";
import { parse } from "query-string";
import React, { Fragment } from "react";
import {
  connectHits,
  Highlight,
  MenuSelect,
  Pagination
} from "react-instantsearch-dom";
import {
  CustomMarker,
  GeoSearch,
  GoogleMapsLoader
} from "react-instantsearch-dom-maps";
import { createInstantSearch } from "react-instantsearch-dom/server";
import { withRouter } from "react-router-dom";

const { InstantSearch, findResultsState } = createInstantSearch();

const styles = (theme: Theme) => ({
  "@global": {
    ".ais-GeoSearch": {
      height: "100%"
    },
    ".ais-GeoSearch-map": {
      height: "100%"
    }
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  map: {
    height: 500
  }
});

interface ISearchProps {
  classes?: any;
  match: any;
  searchState: any;
  resultsState: any;
  location: any;
}

interface ISearchState {
  mapOpen: boolean;
  selectedHit: any;
}

export class Search extends React.Component<ISearchProps, ISearchState> {
  /*public static async getInitialProps(params) {
    const searchState = params.asPath.includes("?")
      ? qs.parse(params.asPath.substring(params.asPath.indexOf("?") + 1))
      : {};
    const resultsState = await findResultsState(App, { searchState });
    return { resultsState, searchState };
  }*/

  public customHits = connectHits(({ hits, selectedHit, onHitOver }) => (
    <div className="hits">
      {hits.map(hit => {
        const classNames = [
          "hit",
          "hit--airbnb",
          selectedHit && selectedHit.objectID === hit.objectID
            ? "hit--airbnb-active"
            : ""
        ];

        return (
          <div
            key={hit.objectID}
            className={classNames.join(" ").trim()}
            // tslint:disable-next-line:jsx-no-lambda
            onMouseEnter={() => onHitOver(hit)}
            // tslint:disable-next-line:jsx-no-lambda
            onMouseLeave={() => onHitOver(null)}
          >
            <div className="hit-content">
              <div>
                <Highlight attribute="name" hit={hit} />
                <span> - ${hit.price}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ));

  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      mapOpen: false,
      selectedHit: null
    };

    this.handleOpenMap = this.handleOpenMap.bind(this);
  }

  public renderGeoHit = hit => {
    const { selectedHit } = this.state;

    const classNames = [
      "my-custom-marker",
      selectedHit && selectedHit.objectID === hit.objectID
        ? "my-custom-marker--active"
        : ""
    ];

    return (
      <CustomMarker
        key={hit.objectID}
        hit={hit}
        anchor={{ x: 0, y: 5 }}
        // tslint:disable-next-line:jsx-no-lambda
        onMouseEnter={() => this.onHitOver(hit)}
        // tslint:disable-next-line:jsx-no-lambda
        onMouseLeave={() => this.onHitOver(null)}
      >
        <div className={classNames.join(" ").trim()}>
          <span>{hit.price_formatted}</span>
        </div>
      </CustomMarker>
    );
  };

  public handleOpenMap = () => (event: any): void => {
    this.setState({ mapOpen: event.target.checked });
  };

  public onHitOver = hit =>
    this.setState(() => ({
      selectedHit: hit
    }));

  public render() {
    const { classes } = this.props;

    let valueProposition = "Ateliers de cuisine autour de vous";
    if (!!this.props.match.params.name) {
      valueProposition = `Ateliers de cuisine à ${
        this.props.match.params.name
      }`;
    }

    // searchState = parse(this.props.location.search)

    return (
      <>
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition={valueProposition}
        />
        <InstantSearch
          appId="appId"
          apiKey="apiKey"
          indexName="indexName"
          searchState={this.props.searchState}
          resultsState={this.props.resultsState}
        >
          <Grid
            container={true}
            justify="space-around"
            spacing={16}
            className={classes.grid}
          >
            <Grid container={true} justify="flex-start" alignItems="center">
              <MenuSelect attribute="category" />
            </Grid>
            <Grid container={true} justify="flex-end">
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.mapOpen}
                    onChange={this.handleOpenMap()}
                    value="mapOpen"
                  />
                }
                label="Afficher la carte"
              />
            </Grid>
          </Grid>
          <Grid container={true}>
            <Grid item={true} xs={9}>
              {this.customHits}
              <Pagination />
            </Grid>
            {this.state.mapOpen && (
              <Grid item={true} xs={3}>
                <div className={classes.map}>
                  <GoogleMapsLoader
                    apiKey="AIzaSyBawL8VbstJDdU5397SUX7pEt9DslAwWgQ"
                    endpoint="https://maps.googleapis.com/maps/api/js?v=3.34"
                  >
                    {google => (
                      <GeoSearch google={google}>
                        {({ hits }) => (
                          <Fragment>{hits.map(this.renderGeoHit)}</Fragment>
                        )}
                      </GeoSearch>
                    )}
                  </GoogleMapsLoader>
                </div>
              </Grid>
            )}
          </Grid>
        </InstantSearch>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(withRouter(
  Search as any
) as any) as any;
