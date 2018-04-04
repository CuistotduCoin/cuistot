import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { Theme, withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { WorkshopCard } from '../WorkshopCard';

const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  root: {
    flexGrow: 1,
  }
};

interface HeaderProps {
  classes?: any;
}

export class Header extends Component<HeaderProps, {}> {
  public render() {

    const { classes } = this.props;

    return (
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <Grid container={true} justify="space-between" alignItems="center">
            <Link to="/">
              <img
                src="https://picsum.photos/20/20/?random" alt="Logo de Cuistot du coin"
              />
            </Link>
            <Grid item={true} justify="flex-end">
              <Link to="/login">
                <Button color="primary">
                  <Typography>
                    Se connecter
                </Typography>
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles as any)(Header as any) as any;
