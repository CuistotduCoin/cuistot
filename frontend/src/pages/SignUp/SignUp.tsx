import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Header from "components/Header";
import Hero from "components/Hero";
import SignUpForm from "components/SignUpForm";
import React from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({});

interface ISignUpProps {
  classes?: any;
}

export class SignUp extends React.Component<ISignUpProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header hideSignUpLogin={true} />
        <Hero
          imageURL="https://picsum.photos/100/50/?random"
          videoURL="video/landing-video.mp4"
          valueProposition="Concoctez avec nous une expérience culinaire authentique et gourmande pour vos salariés !"
        />
        <SignUpForm />
        <Typography align="center" gutterBottom={true}>
          Déjà membre ? <Link to="/login">Connectez vous !</Link>
        </Typography>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(SignUp as any) as any;
