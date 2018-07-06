import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({
  loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

interface ILoadingProps {
  classes?: any;
}

export class Hero extends React.Component<ILoadingProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }
}

export default withStyles(styles as any)(Hero as any) as any;
