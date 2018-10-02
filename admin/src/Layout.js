import { connect } from 'react-redux';
import { Layout } from 'react-admin';

const darkTheme = {
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
};

const lightTheme = {
  palette: {
    secondary: {
      light: '#5f5fc4',
      main: '#F44336',
      dark: '#F44336',
      contrastText: '#fff',
    },
  },
};

export default connect(
  state => ({
    theme: state.theme === 'dark' ? darkTheme : lightTheme,
  }),
  {},
)(Layout);
