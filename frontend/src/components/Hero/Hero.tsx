import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";

const styles = (theme: Theme) => ({
  content: {
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex"
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  home: {
    color: "#fff",
    overflow: "hidden",
    position: "relative"
  },
  video: {
    bottom: 0,
    left: "50%",
    minHeight: "100%",
    minWidth: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    transform: "translateX(-50%)",
    zIndex: -1
  }
});

interface IHeroProps {
  classes?: any;
  height: number;
  videoURL: string;
  imageURL: string;
  valueProposition: string;
  description: string;
}

export class Hero extends Component<IHeroProps, {}> {
  public static defaultProps: Partial<IHeroProps> = {
    height: 500,
    valueProposition: "Des saveurs à partager"
  };

  private innerBackground = {
    backgroundImage: `url(${this.props.imageURL})`
  };
  private innerHeight = {
    height: this.props.height
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.home}>
        <div className={classes.content} style={this.innerHeight}>
          <Grid container={true} direction="column">
            <Grid item={true}>
              <Typography
                variant="title"
                align="center"
                component="h1"
                color="inherit"
              >
                {this.props.valueProposition}
              </Typography>
              {this.props.description && (
                <Typography
                  variant="subheading"
                  align="center"
                  component="p"
                  color="inherit"
                >
                  {this.props.description}
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>

        <div className={classes.video} style={this.innerBackground} />
        <video
          className={classes.video}
          autoPlay={true}
          muted={true}
          loop={true}
          poster={this.props.imageURL}
        >
          <source src={this.props.videoURL} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default withStyles(styles as any)(Hero as any) as any;
