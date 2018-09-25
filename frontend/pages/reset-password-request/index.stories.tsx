import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import ResetPasswordRequest from "./ResetPasswordRequest";

storiesOf("Cuistot/pages/ResetPasswordRequest", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => <ResetPasswordRequest />);
