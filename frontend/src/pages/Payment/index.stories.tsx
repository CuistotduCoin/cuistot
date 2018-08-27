import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Payment from "./Payment";

storiesOf("Cuistot/pages/Payment", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <Payment
      name="Atelier Sushis, Makis et Témaris"
      nameCook="Takako"
      date="Samedi 19 Juin 2018, à 14h"
      price="50"
    />
  ));
