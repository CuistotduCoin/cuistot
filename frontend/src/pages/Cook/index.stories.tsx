import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Cook from "./Cook";

storiesOf("Cuistot/pages/Cook", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => <Cook />);
