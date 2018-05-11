import Grid from "material-ui/Grid";
import { Theme, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({
  background: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    bottom: 0,
    left: 0,
    overflow: "hidden",
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%"
  },
  content: {
    backgroundColor: "transparent",
    left: 0,
    position: "absolute",
    right: 0,
    top: "120px",
    zIndex: 1
  },
  hero: {
    bottom: "0%",
    height: "100%",
    left: "0%",
    overflow: "hidden",
    position: "relative",
    width: "100%"
  },
  home: {
    height: "300px"
  },
  video: {
    opacity: 1,
    position: "relative",
    width: "100%"
  }
});

interface IHeroProps {
  classes?: any;
  videoURL: string;
  imageURL: string;
  valueProposition: string;
}

export class Hero extends Component<IHeroProps, {}> {
  public static defaultProps = { valueProposition: "Des saveurs à partager" };

  private innerStyle = {
    backgroundImage: `url(${this.props.imageURL})`
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.home}>
        <div className={classes.hero}>
          <div className={classes.background} style={this.innerStyle} />
          <video
            className={classes.video}
            autoPlay={true}
            muted={true}
            loop={true}
            poster={this.props.imageURL}
          >
            <source src={this.props.videoURL} type="video/mp4" />
          </video>
          <div className={classes.content}>
            <Grid container={true} justify="space-around">
              <Grid item={true} xs={12}>
                <Typography variant="title" align="center" component="h1">
                  {this.props.valueProposition}
                </Typography>
                <Typography variant="subheading" align="center" component="p">
                  Atelier de Cuisine, Dégustation, Cuisine à domicile
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles as any)(Hero as any) as any;
