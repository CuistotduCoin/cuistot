import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";

storiesOf("Cuistot/pages/SignUp", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => <SignUp />);
