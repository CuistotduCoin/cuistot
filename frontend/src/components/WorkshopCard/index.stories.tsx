import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import WorkshopCard from "../WorkshopCard";

storiesOf("Cuistot/components/WorkshopCard", module).add("default", () => (
  <WorkshopCard />
));
