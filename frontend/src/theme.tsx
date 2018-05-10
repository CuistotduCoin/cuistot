import green from "material-ui/colors/green";
import red from "material-ui/colors/red";
import { createMuiTheme } from "material-ui/styles";

// Configure Material UI theme
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
});

export default theme;
