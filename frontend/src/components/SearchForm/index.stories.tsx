import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import SearchForm from "./SearchForm";

storiesOf("Cuistot/components/SearchForm", module).add("default", () => (
  <SearchForm />
));
