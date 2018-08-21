import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/LockOutline';

import { Notification, translate, userLogin } from 'react-admin';

const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'url(https://source.unsplash.com/random/1600x900)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  card: {
    minWidth: 300,
    marginTop: '6em',
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    marginTop: '1em',
  },
  actions: {
    padding: '0 1em 1em 1em',
  },
});

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({
  meta: { touched, error } = {},
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(auth) {
    const { location, userLogin: userLoginProp } = this.props;
    userLoginProp(
      auth,
      location.state
        ? location.state.nextPathname
        : '/',
    );
  }

  render() {
    const {
      classes, handleSubmit, isLoading, translate: translateProp,
    } = this.props;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <div className={classes.avatar}>
            <Avatar className={classes.icon}>
              <LockIcon />
            </Avatar>
          </div>
          <form onSubmit={handleSubmit(this.login)}>
            <div className={classes.form}>
              <div className={classes.input}>
                <Field
                  name="username"
                  component={renderInput}
                  label={translateProp('ra.auth.username')}
                  disabled={isLoading}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="password"
                  component={renderInput}
                  label={translateProp('ra.auth.password')}
                  type="password"
                  disabled={isLoading}
                />
              </div>
            </div>
            <CardActions className={classes.actions}>
              <Button
                variant="raised"
                type="submit"
                color="primary"
                disabled={isLoading}
                className={classes.button}
                fullWidth
              >
                {isLoading && (
                  <CircularProgress size={25} thickness={2} />
                )}
                {translateProp('ra.auth.sign_in')}
              </Button>
            </CardActions>
          </form>
        </Card>
        <Notification />
      </div>
    );
  }
}

Login.propTypes = {
  ...propTypes,
  authProvider: PropTypes.func,
  classes: PropTypes.object.isRequired,
  previousRoute: PropTypes.string,
  translate: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
  translate,
  reduxForm({
    form: 'signIn',
    validate: (values, props) => {
      const errors = {};
      const { translate: translateProp } = props;
      if (!values.username) {
        errors.username = translateProp('ra.validation.required');
      }
      if (!values.password) {
        errors.password = translateProp('ra.validation.required');
      }
      return errors;
    },
  }),
  connect(
    mapStateToProps,
    { userLogin },
  ),
  withStyles(styles),
);

export default enhance(Login);
