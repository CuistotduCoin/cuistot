import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import components from "../../content/components";
// @ts-ignore
import Content from "../../content/invite.mdx";

const styles = (theme: Theme) => ({
  card: {
    width: 300
  },
  cardHeader: {
    background: "rgba(0, 0, 0, 0.4)",
    color: "fff",
    height: 40,
    marginTop: -72
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  link: {
    textDecoration: "none"
  },
  media: {
    height: 135
  },
  title: { color: "white" }
});

interface IInviteProps {
  classes?: any;
}

export class Invite extends React.Component<IInviteProps, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <Hero
          imageURL="https://static.cuistotducoin.com/img/home/landing.jpg"
          videoURL="https://static.cuistotducoin.com/video/landing-video.mp4"
          valueProposition="Invitez vos proches"
        />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Content components={components} />
        </Grid>
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={12}>
            <Grid container={true} justify="center">
              <a
                className={classes.link}
                href="https://cuistotducoin.typeform.com/to/s9TN8K"
                target="_blank"
              >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image="https://static.cuistotducoin.com/img/business/buffet.jpg"
                    title="Invitez vos proches"
                  />
                  <CardHeader
                    className={classes.cardHeader}
                    title="Invitez vos proches"
                    classes={{
                      title: classes.title
                    }}
                  />
                  <CardContent className={classes.cardShortContent}>
                    <Typography component="p">
                      Invitez vos proches pour profiter de l'offre spéciale de
                      septembre !
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Invite as any) as any;
