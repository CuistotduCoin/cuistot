import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import WorkshopCard from "../WorkshopCard";
import WorkshopCardList from "./WorkshopCardList";

const stories = storiesOf("Cuistot/components/WorkshopCardList", module);

stories.add("default", () => {
  const workshops = [
    <WorkshopCard
      price={20}
      title="Atelier Sushis, Makis et Témaris"
      date="Samedi 19 Juin 2018, de 14h à 18h"
      image="https://picsum.photos/400/194/?random"
      rating={4.1}
      availableSeat={6}
      spot="Brest"
      totalSeat={6}
      totalDate={3}
      key={1}
    />,
    <WorkshopCard
      price={20}
      title="Atelier Sushis, Makis et Témaris"
      date="Samedi 19 Juin 2018, de 14h à 18h"
      image="https://picsum.photos/400/194/?random"
      rating={4.1}
      availableSeat={6}
      spot="Brest"
      totalSeat={6}
      totalDate={3}
      key={2}
    />,
    <WorkshopCard
      price={20}
      title="Atelier Sushis, Makis et Témaris"
      date="Samedi 19 Juin 2018, de 14h à 18h"
      image="https://picsum.photos/400/194/?random"
      rating={4.1}
      availableSeat={6}
      spot="Brest"
      totalSeat={6}
      totalDate={3}
      key={3}
    />,
    <WorkshopCard
      price={20}
      title="Atelier Sushis, Makis et Témaris"
      date="Samedi 19 Juin 2018, de 14h à 18h"
      image="https://picsum.photos/400/194/?random"
      rating={4.1}
      availableSeat={6}
      spot="Brest"
      totalSeat={6}
      totalDate={3}
      key={4}
    />,
    <WorkshopCard
      price={20}
      title="Atelier Sushis, Makis et Témaris"
      date="Samedi 19 Juin 2018, de 14h à 18h"
      image="https://picsum.photos/400/194/?random"
      rating={4.1}
      availableSeat={6}
      spot="Brest"
      totalSeat={6}
      totalDate={3}
      key={5}
    />,
    <WorkshopCard
      price={20}
      title="Atelier Sushis, Makis et Témaris"
      date="Samedi 19 Juin 2018, de 14h à 18h"
      image="https://picsum.photos/400/194/?random"
      rating={4.1}
      availableSeat={6}
      spot="Brest"
      totalSeat={6}
      totalDate={3}
      key={6}
    />,
    <WorkshopCard
      price={20}
      title="Atelier Sushis, Makis et Témaris"
      date="Samedi 19 Juin 2018, de 14h à 18h"
      image="https://picsum.photos/400/194/?random"
      rating={4.1}
      availableSeat={6}
      spot="Brest"
      totalSeat={6}
      totalDate={3}
      key={7}
    />,
    <WorkshopCard
      price={20}
      title="Atelier Sushis, Makis et Témaris"
      date="Samedi 19 Juin 2018, de 14h à 18h"
      image="https://picsum.photos/400/194/?random"
      rating={4.1}
      availableSeat={6}
      spot="Brest"
      totalSeat={6}
      totalDate={3}
      key={8}
    />
  ];

  return <WorkshopCardList workshops={workshops} />;
});
