import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// Configure Material UI theme
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  },
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 14
  }
});

export default theme;
