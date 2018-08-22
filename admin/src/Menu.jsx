import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  translate,
  DashboardMenuItem,
  MenuItemLink,
  Responsive,
} from 'react-admin';
import { withRouter } from 'react-router-dom';
import { WorkshopIcon } from './workshops';
import { GourmetIcon } from './gourmets';
import { CookIcon } from './cooks';
import { BookingIcon } from './bookings';
import { KitchenIcon } from './kitchens';
import { EvaluationIcon } from './evaluations';

const items = [
  { name: 'workshops', icon: <WorkshopIcon /> },
  { name: 'gourmets', icon: <GourmetIcon /> },
  { name: 'cooks', icon: <CookIcon /> },
  { name: 'bookings', icon: <BookingIcon /> },
  { name: 'kitchens', icon: <KitchenIcon /> },
  { name: 'evaluations', icon: <EvaluationIcon /> },
];

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
};

const Menu = ({
  onMenuClick,
  translate, // eslint-disable-line
  logout,
}) => (
  <div style={styles.main}>
    <DashboardMenuItem onClick={onMenuClick} />
    {items.map(item => (
      <MenuItemLink
        key={item.name}
        to={`/${item.name}`}
        primaryText={translate(`resources.${item.name}.name`, {
          smart_count: 2,
        })}
        leftIcon={item.icon}
        onClick={onMenuClick}
      />
    ))}
    <MenuItemLink
      to="/configuration"
      primaryText={translate('pos.configuration')}
      leftIcon={<SettingsIcon />}
      onClick={onMenuClick}
    />
    <Responsive xsmall={logout} medium={null} />
  </div>
);

Menu.propTypes = {
  logout: PropTypes.node.isRequired,
  onMenuClick: PropTypes.func, // eslint-disable-line
};

const enhance = compose(
  withRouter,
  connect(
    state => ({
      theme: state.theme,
      locale: state.i18n.locale,
    }),
    {},
  ),
  translate,
);

export default enhance(Menu);
