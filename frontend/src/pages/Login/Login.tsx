import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Header from "components/Header";
import Hero from "components/Hero";
import LoginForm from "components/LoginForm";
import React from "react";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => ({});

interface ILoginProps {
  classes?: any;
}

export class Login extends React.Component<ILoginProps, {}> {
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
        <LoginForm />
        <Typography align="center">
          Pas encore membre ? <Link to="/signup">Inscrivez vous !</Link>
        </Typography>
        <Typography align="center" gutterBottom={true}>
          <Link to="/signup">Vous avez oubliez votre mot de passe ?</Link>
        </Typography>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Login as any) as any;
