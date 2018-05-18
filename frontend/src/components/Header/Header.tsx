import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { Theme, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";

// tslint:disable-next-line:no-shadowed-variable
const styles = (theme: Theme) => ({
  appBar: {
    background:
      "linear-gradient(180deg,hsla(0,0%,100%,.9) 0,hsla(0,0%,100%,.8))"
  },
  button: {
    margin: theme.spacing.unit
  }
});

interface IHeaderProps {
  classes?: any;
}
interface IHeaderState {
  buttonText?: string;
}

export class Header extends Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
      buttonText: "Se connecter"
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  public handleScroll = (evt: any) => {
    if (window.scrollY > 0) {
      this.setState({ buttonText: "S'inscrire" });
    } else {
      this.setState({ buttonText: "Se connecter" });
    }
  };

  public componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  public render() {
    const { classes } = this.props;
    const myLink = (props: any) => <Link to="/login" {...props} />;

    return (
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Grid container={true} justify="flex-start" alignItems="center">
            <Link to="/">
              <img
                src="https://picsum.photos/40/40/?random"
                alt="Logo de Cuistot du coin"
              />
            </Link>
            <Hidden smDown={true}>
              <Button
                className={classes.button}
                component={myLink}
                color="primary"
              >
                Entreprise
              </Button>
              <Button
                className={classes.button}
                component={myLink}
                color="primary"
              >
                Particulier
              </Button>
            </Hidden>
          </Grid>
          <Grid container={true} justify="flex-end">
            <Button
              className={classes.button}
              component={myLink}
              variant="raised"
              color="primary"
              onScroll={this.handleScroll}
            >
              {this.state.buttonText}
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles as any)(Header as any) as any;
