import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import LoginForm from "../../components/LoginForm";

const styles = () => ({});

interface ILoginProps {
  classes?: any;
}

export class Login extends React.Component<ILoginProps, {}> {
  public render() {
    return (
      <>
        <Header hideSignUpLogin={true} />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !"
        />
        <LoginForm />
        <Typography align="center">
          Pas encore membre ?{" "}
          <Link href="/signup">
            <a>Inscrivez vous !</a>
          </Link>
        </Typography>
        <Typography align="center" gutterBottom={true}>
          <Link href="/signup">
            <a>Vous avez oubliez votre mot de passe ?</a>
          </Link>
        </Typography>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Login as any) as any;
