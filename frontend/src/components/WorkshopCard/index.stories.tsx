import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import WorkshopCard from "./WorkshopCard";

storiesOf("Cuistot/components/WorkshopCard", module).add("default", () => (
  <WorkshopCard
    price={20}
    title="Atelier Sushis, Makis et Témaris"
    date="Samedi 19 Juin 2018, de 14h à 18h"
    image="https://picsum.photos/400/194/?random"
    stars={5}
    availableSeat={6}
  />
));
