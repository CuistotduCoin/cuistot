import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import PaymentCardForm from "./PaymentCardForm";

storiesOf("Cuistot/components/PaymentCardForm", module).add("default", () => (
  <PaymentCardForm />
));
