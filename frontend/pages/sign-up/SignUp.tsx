import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import SignUpForm from "../../components/SignUpForm";

const styles = () => ({});

interface ISignUpProps {
  classes?: any;
}

export class SignUp extends React.Component<ISignUpProps, {}> {
  public render() {
    return (
      <>
        <Header hideSignUpLogin={true} />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !"
        />
        <SignUpForm />
        <Typography align="center" gutterBottom={true}>
          Déjà membre ?
          <Link href="/login">
            <a>Connectez vous !</a>
          </Link>
        </Typography>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(SignUp as any) as any;
