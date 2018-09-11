import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { translate, changeLocale, Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import { changeTheme } from './actions';

const styles = {
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' },
};

const Configuration = ({
  classes,
  theme,
  locale,
  changeThemeHandler,
  changeLocaleHandler,
  translate, // eslint-disable-line
}) => (
  <Card>
    <Title title="pos.configuration" />
    <CardContent>
      <div
        className={classes.label}
        style={{ color: theme === 'light' ? 'black' : 'white' }}
      >
        {translate('pos.theme.name')}
      </div>
      <Button
        variant="raised"
        className={classes.button}
        color={theme === 'light' ? 'primary' : 'default'}
        onClick={() => changeThemeHandler('light')}
      >
        {translate('pos.theme.light')}
      </Button>
      <Button
        variant="raised"
        className={classes.button}
        color={theme === 'dark' ? 'primary' : 'default'}
        onClick={() => changeThemeHandler('dark')}
      >
        {translate('pos.theme.dark')}
      </Button>
    </CardContent>
    <CardContent>
      <div
        className={classes.label}
        style={{ color: theme === 'light' ? 'black' : 'white' }}
      >
        {translate('pos.language')}
      </div>
      <Button
        variant="raised"
        className={classes.button}
        color={locale === 'en' ? 'primary' : 'default'}
        onClick={() => changeLocaleHandler('en')}
      >
        en
      </Button>
      <Button
        variant="raised"
        className={classes.button}
        color={locale === 'fr' ? 'primary' : 'default'}
        onClick={() => changeLocaleHandler('fr')}
      >
        fr
      </Button>
    </CardContent>
  </Card>
);

Configuration.propTypes = {
  translate: PropTypes.func.isRequired,
  changeLocaleHandler: PropTypes.func.isRequired,
  changeThemeHandler: PropTypes.func.isRequired,
  classes: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  theme: state.theme,
  locale: state.i18n.locale,
});

export default compose(
  connect(mapStateToProps, {
    changeLocaleHandler: changeLocale,
    changeThemeHandler: changeTheme,
  }),
  translate,
  withStyles(styles),
)(Configuration);
