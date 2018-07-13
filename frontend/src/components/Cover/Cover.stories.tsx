import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Cover from "./Cover";

storiesOf("Cuistot/components/Cover", module)
  .addDecorator(story => (
    <Cover imageURL="https://picsum.photos/1000/300/?random" />
  ))
  .add("default", () => <Cover />);
