import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import WorkshopCardList from "../WorkshopCardList";

storiesOf("Cuistot/components/WorkshopCardList", module).add("default", () => (
  <WorkshopCardList />
));
