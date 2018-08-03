import React from "react";
import 'typeface-roboto';
import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { setOptions } from "@storybook/addon-options";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from '../src/theme';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../src/main.css";

const reqComps = require.context("../src/components", true, /.stories.tsx$/);
const reqPages = require.context("../src/pages", true, /.stories.tsx$/);

const load = () => {
  reqComps.keys().forEach(reqComps);
  reqPages.keys().forEach(reqPages);
};

addDecorator(story => <MuiThemeProvider theme={createMuiTheme(theme)}>{story()}</MuiThemeProvider>);
addDecorator(withKnobs);

setOptions({
  name: "Cuistot du Coin",
  url: "https://www.cuistotducoin.com",
  showDownPanel: true,
  downPanelInRight: true
});

configure(load, module);
