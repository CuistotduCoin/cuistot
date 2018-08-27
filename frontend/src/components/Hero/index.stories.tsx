import { storiesOf } from "@storybook/react";
import React from "react";
import Hero from "./Hero";

storiesOf("Cuistot/components/Hero", module).add("default", () => (
  <Hero
    imageURL="https://picsum.photos/1000/300/?random"
    videoURL="http://thenewcode.com/assets/videos/polina.mp4"
  />
));
