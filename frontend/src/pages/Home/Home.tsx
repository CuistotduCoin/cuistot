import React, { Component } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import WorkshopCardList from "../../components/WorkshopCardList";
import logo from "./react.svg";

export class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <>
        <Header />
        <Hero
          imageURL="https://picsum.photos/100/50/?random"
          videoURL="http://thenewcode.com/assets/videos/polina.mp4"
        />
        <WorkshopCardList />
        <Footer />
      </>
    );
  }
}

export default Home;
