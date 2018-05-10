import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import LoginForm from "./LoginForm";

storiesOf("Cuistot/components/LoginForm", module).add("default", () => (
  <LoginForm />
));
