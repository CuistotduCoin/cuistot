import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { Theme, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { Link } from "react-router-dom";

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
  static?: boolean;
  hideSignUpLogin: boolean;
  hideCompanyIndividual: boolean;
}
interface IHeaderState {
  up?: boolean;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
      up: true
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  public handleScroll = (evt: any) => {
    if (window.scrollY > 0) {
      this.setState({ up: false });
    } else {
      this.setState({ up: true });
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

    const businessLink = (props: any) => <Link to="/business" {...props} />;
    const individualLink = (props: any) => <Link to="/individual" {...props} />;
    const signUp = (props: any) => <Link to="/signup" {...props} />;
    const login = (props: any) => <Link to="/login" {...props} />;

    const button = this.state.up ? (
      <Button
        className={classes.button}
        component={login}
        variant="raised"
        color="primary"
        onScroll={this.handleScroll}
      >
        Se connecter
      </Button>
    ) : (
      <Button
        className={classes.button}
        component={signUp}
        variant="raised"
        color="primary"
        onScroll={this.handleScroll}
      >
        S'inscrire
      </Button>
    );

    return (
      <AppBar
        position={this.props.static ? "static" : "sticky"}
        className={classes.appBar}
      >
        <Toolbar>
          <Grid container={true} justify="flex-start" alignItems="center">
            <Link to="/">
              <img
                src="https://static.cuistotducoin.com/img/logo.svg"
                alt="Logo de Cuistot du coin"
                height={40}
                width={40}
              />
            </Link>
            {!this.props.hideCompanyIndividual && (
              <Hidden smDown={true}>
                <Button
                  className={classes.button}
                  component={businessLink}
                  color="primary"
                >
                  Entreprise
                </Button>
                <Button
                  className={classes.button}
                  component={individualLink}
                  color="primary"
                >
                  Particulier
                </Button>
              </Hidden>
            )}
          </Grid>
          {!this.props.hideSignUpLogin && // false is temp
            false && (
              <Grid container={true} justify="flex-end">
                {button}
              </Grid>
            )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles as any)(Header as any) as any;
