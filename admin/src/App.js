import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin } from 'react-admin';

import buildGraphQLProvider from './dataProvider';
import themeReducer from './themeReducer';
import Layout from './Layout';
import Menu from './Menu';
import customRoutes from './routes';
import englishMessages from './i18n/en';
import frenchMessages from './i18n/fr';
import './App.css';

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

  componentDidMount() {
    buildGraphQLProvider({
      clientOptions: {
        uri: process.env.GRAPHQL_API_URL,
      },
    }).then(dataProvider => this.setState({ dataProvider }));
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
        dataProvider={dataProvider}
        customReducers={{ theme: themeReducer }}
        customRoutes={customRoutes}
        appLayout={Layout}
        menu={Menu}
        locale="fr"
        i18nProvider={i18nProvider}
      />
    );
  }
}

export default App;
