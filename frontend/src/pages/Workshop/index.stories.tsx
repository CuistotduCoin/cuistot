import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Workshop from "./Workshop";

storiesOf("Cuistot/pages/Workshop", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <Workshop
      price={20}
      name="Atelier Sushis, Makis et Témaris"
      nameCook="Takako"
      date="Samedi 19 Juin 2018, à 14h"
      mainPhoto="https://picsum.photos/1000/300/?random"
      photos={[
        {
          id: 1,
          image: "https://picsum.photos/240/135/?random",
          name: "photo 1"
        },
        {
          id: 2,
          image: "https://picsum.photos/240/135/?random",
          name: "photo 2"
        },
        {
          id: 3,
          image: "https://picsum.photos/240/135/?random",
          name: "photo 3"
        }
      ]}
      imageCook="https://picsum.photos/40/40/?random"
      rating={4.1}
      ratingNumber={7}
      availableSeat={6}
      minSeat={2}
      maxSeat={6}
      spot="Arthur Bonnet, Brest"
      totalSeat={6}
      totalDate={3}
      dayEndBook={3}
      eventType="Atelier collectif"
      cuisineType="Japonais"
      timeEvent="20:00 - 22:30"
    />
  ));
