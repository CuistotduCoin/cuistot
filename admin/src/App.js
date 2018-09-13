import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import authProvider from './authProvider';
import buildDataProvider from './dataProvider/builder';
import themeReducer from './themeReducer';
import Layout from './Layout';
import Login from './Login';
import Dashboard from './dashboard/Dashboard';
import Menu from './Menu';
import customRoutes from './routes';
import englishMessages from './i18n/en';
import frenchMessages from './i18n/fr';
import './App.css';
import {
  WorkshopList,
  WorkshopShow,
  WorkshopEdit,
  WorkshopCreate,
  WorkshopIcon,
} from './workshops';
import {
  GourmetList,
  GourmetShow,
  GourmetEdit,
  GourmetIcon,
} from './gourmets';
import {
  CookList,
  CookShow,
  CookEdit,
  CookCreate,
  CookIcon,
} from './cooks';
import {
  BookingList,
  BookingShow,
  BookingCreate,
  BookingEdit,
  BookingIcon,
} from './bookings';
import {
  KitchenList,
  KitchenCreate,
  KitchenShow,
  KitchenEdit,
  KitchenIcon,
} from './kitchens';
import {
  EvaluationList,
  EvaluationShow,
  EvaluationCreate,
  EvaluationEdit,
  EvaluationIcon,
} from './evaluations';

const i18nProvider = (locale) => {
  if (locale === 'fr') {
    return frenchMessages;
  }
  // Always fallback on english
  return englishMessages;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { dataProvider: null };
  }

  async componentWillMount() {
    const dataProvider = await buildDataProvider();
    this.setState({ dataProvider });
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      );
    }

    return (
      <Admin
        title="Cuistot du coin"
        dataProvider={this.state.dataProvider}
        customReducers={{ theme: themeReducer }}
        customRoutes={customRoutes}
        authProvider={authProvider}
        appLayout={Layout}
        dashboard={Dashboard}
        menu={Menu}
        loginPage={Login}
        locale="fr"
        i18nProvider={i18nProvider}
      >
        <Resource
          name="workshops"
          list={WorkshopList}
          show={WorkshopShow}
          edit={WorkshopEdit}
          create={WorkshopCreate}
          icon={WorkshopIcon}
        />
        <Resource
          name="gourmets"
          list={GourmetList}
          show={GourmetShow}
          edit={GourmetEdit}
          icon={GourmetIcon}
        />
        <Resource
          name="cooks"
          list={CookList}
          show={CookShow}
          edit={CookEdit}
          create={CookCreate}
          icon={CookIcon}
        />
        <Resource
          name="bookings"
          list={BookingList}
          show={BookingShow}
          create={BookingCreate}
          edit={BookingEdit}
          icon={BookingIcon}
        />
        <Resource
          name="kitchens"
          list={KitchenList}
          show={KitchenShow}
          create={KitchenCreate}
          edit={KitchenEdit}
          icon={KitchenIcon}
        />
        <Resource
          name="evaluations"
          list={EvaluationList}
          show={EvaluationShow}
          create={EvaluationCreate}
          edit={EvaluationEdit}
          icon={EvaluationIcon}
        />
      </Admin>
    );
  }
}

export default App;
