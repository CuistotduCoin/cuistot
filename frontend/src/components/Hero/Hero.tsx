import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const styles = () => ({
  backgroundImage: {
    bottom: 0,
    left: "50%",
    minHeight: "100%",
    minWidth: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    transform: "translateX(-50%);",
    zIndex: -1
  },
  content: {
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex"
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
    transform: "translate(-50%, -25%);",
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
  children: any;
}

export class Hero extends React.Component<IHeroProps, {}> {
  public static defaultProps: Partial<IHeroProps> = {
    height: 400,
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
                variant="display1"
                align="center"
                component="h1"
                color="inherit"
              >
                {this.props.valueProposition}
              </Typography>
              {this.props.description && (
                <Typography
                  variant="headline"
                  align="center"
                  component="p"
                  color="inherit"
                >
                  {this.props.description}
                </Typography>
              )}
              {this.props.children}
            </Grid>
          </Grid>
        </div>

        <div className={classes.backgroundImage} style={this.innerBackground} />
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
