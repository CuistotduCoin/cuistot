import { Divider, RootRef } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import { Theme, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import Kitchen from "@material-ui/icons/Kitchen";
import LocalDining from "@material-ui/icons/LocalDining";
import Lock from "@material-ui/icons/Lock";
import People from "@material-ui/icons/People";
import BookForm from "components/BookForm";
import CommentBlock from "components/CommentBlock";
import Cover from "components/Cover";
import Footer from "components/Footer";
import Header from "components/Header";
import StarRating from "components/StarRating";
import React from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import Waypoint from "react-waypoint";

const styles = (theme: Theme) => ({
  avatar: {
    backgroundColor: green[500],
    height: 80,
    width: 80
  },
  button: {
    margin: theme.spacing.unit
  },
  cancellation: {
    padding: theme.spacing.unit * 2
  },
  commentBlock: {
    padding: theme.spacing.unit * 2
  },
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  img: {
    verticalAlign: "middle"
  },
  infoReservartion: {
    padding: theme.spacing.unit * 2
  },
  innerGrid: {
    paddingBottom: 24,
    paddingTop: 24
  },
  itemGrid: {
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit
  },
  leftGrid: {
    padding: theme.spacing.unit * 2
  },
  paragraph: {
    padding: theme.spacing.unit * 2
  },
  popover: {
    pointerEvents: "none"
  },
  sticky: {
    backgroundColor: "white",
    position: "sticky",
    top: 0,
    zIndex: 10
  },
  tabs: {
    minWidth: 0
  },
  tile: {
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.5)",
    bottom: 0,
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  tileContainer: {
    display: "block",
    position: "relative",
    width: "100%"
  }
});

interface IWorkshopProps {
  classes?: any;
  price: number;
  name: string;
  date: string;
  duration: number;
  mainPhoto: string;
  photos: any;
  imageCook: string;
  nameCook: string;
  rating?: number;
  ratingNumber?: number;
  availableSeat: number;
  spot: string;
  minSeat: string;
  maxSeat: number;
  totalDate?: number;
  dayEndBook: number;
  eventType: string;
  cuisineType: string;
  timeEvent: string;
  descriptionCook: string;
  descriptionWorkshop: string;
  comments: any;
  furtherInformation: string;
}

interface IWorkshopState {
  popoverAnnulation: any;
  tabIndex: number;
}

export class Workshop extends React.Component<IWorkshopProps, IWorkshopState> {
  public state = {
    popoverAnnulation: null,
    tabIndex: 0
  };

  public handlePopoverOpen = event => {
    this.setState({ popoverAnnulation: event.target });
  };

  public handlePopoverClose = () => {
    this.setState({ popoverAnnulation: null });
  };

  public handleChangeTabIndex = (e, index) => {
    this.setState({ tabIndex: index });
    if (index !== 4) {
      this.scrolltoElement(index);
    } else {
      Scroll.animateScroll.scrollToTop();
    }
  };

  public handleWayPoint = index => {
    this.setState({ tabIndex: index });
  };

  public render() {
    const { classes } = this.props;
    const open = Boolean(this.state.popoverAnnulation);

    return (
      <>
        <Header static={true} />
        <Cover imageURL={this.props.mainPhoto} />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          className={classes.grid}
        >
          <Grid item={true} xs={2}>
            <Grid container={true} justify="center">
              <Avatar className={classes.avatar} src={this.props.imageCook} />
            </Grid>
          </Grid>
          <Grid item={true} xs={10}>
            <Grid container={true}>
              <Grid item={true}>
                {this.props.rating && (
                  <Grid container={true}>
                    <StarRating rating={this.props.rating} />
                    {this.props.ratingNumber && (
                      <Typography
                        variant="caption"
                        className={classes.ratingNumber}
                      >
                        ({this.props.ratingNumber})
                      </Typography>
                    )}
                  </Grid>
                )}
                <Typography variant="title" component="p" gutterBottom={true}>
                  Recontrez {this.props.nameCook}
                </Typography>
                <Typography
                  variant="headline"
                  component="h2"
                  gutterBottom={true}
                >
                  {this.props.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container={true} justify="space-around" className={classes.grid}>
          <Grid item={true} xs={8}>
            <Tabs
              value={this.state.tabIndex}
              indicatorColor="primary"
              textColor="primary"
              onChange={this.handleChangeTabIndex}
              className={classes.sticky}
            >
              <Tab label="Au menu" className={classes.tabs} />
              <Tab label="Le Cuistot" className={classes.tabs} />
              <Tab label="Commentaires" className={classes.tabs} />
              <Tab
                label="Informations complémentaires"
                className={classes.tabs}
              />
              <Tab className={classes.tabs} icon={<KeyboardArrowUp />} />
            </Tabs>
            <Grid
              container={true}
              justify="space-around"
              alignItems="center"
              className={classes.innerGrid}
            >
              <Grid item={true}>
                <Grid container={true}>
                  <Kitchen />
                  <Typography>{this.props.eventType}</Typography>
                </Grid>
              </Grid>
              <Grid item={true}>
                <Grid container={true}>
                  <LocalDining />
                  <Typography>{this.props.cuisineType}</Typography>
                </Grid>
              </Grid>
              <Grid item={true}>
                <Grid container={true}>
                  <People />
                  <Typography>
                    de {this.props.minSeat} à {this.props.maxSeat} invités
                  </Typography>
                </Grid>
              </Grid>
              <Grid item={true}>
                <Grid container={true}>
                  <AccessTime />
                  <Typography>{this.props.timeEvent}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container={true}
              className={classes.leftGrid}
              direction="column"
            >
              <Scroll.Element name="0" />
              <Waypoint
                // tslint:disable-next-line:jsx-no-lambda
                onEnter={() => {
                  this.handleWayPoint(0);
                }}
              >
                <div>
                  <Grid item={true} className={classes.itemGrid}>
                    <Typography
                      variant="headline"
                      component="h2"
                      gutterBottom={true}
                    >
                      Au menu
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      paragraph={true}
                      className={classes.paragraph}
                    >
                      {this.props.descriptionWorkshop}
                    </Typography>
                  </Grid>
                  <Grid item={true} className={classes.itemGrid}>
                    <Typography
                      variant="headline"
                      component="h2"
                      gutterBottom={true}
                    >
                      Photos & Videos
                    </Typography>
                    <Grid
                      container={true}
                      alignItems="center"
                      justify="space-around"
                    >
                      {this.props.photos !== undefined &&
                        this.props.photos.slice(0, 3).map((photo, i) => (
                          <Grid key={photo.id} item={true}>
                            {i !== 2 ? (
                              <img
                                src={photo.image}
                                alt={photo.name}
                                width={200}
                              />
                            ) : (
                              <div className={classes.tileContainer}>
                                <img
                                  src={photo.image}
                                  alt={photo.name}
                                  className={classes.img}
                                  width={200}
                                />
                                <div className={classes.tile}>
                                  <Typography
                                    variant="body1"
                                    component="p"
                                    align="center"
                                    color="inherit"
                                  >
                                    Voir plus de photos
                                  </Typography>
                                </div>
                              </div>
                            )}
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                </div>
              </Waypoint>
              <Scroll.Element name="1" />
              <Waypoint
                // tslint:disable-next-line:jsx-no-lambda
                onEnter={() => {
                  this.handleWayPoint(1);
                }}
              >
                <div>
                  <Grid item={true} className={classes.itemGrid}>
                    <Typography
                      variant="headline"
                      component="h2"
                      gutterBottom={true}
                    >
                      Le Cuistot
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      paragraph={true}
                      className={classes.paragraph}
                    >
                      {this.props.descriptionCook}
                    </Typography>
                  </Grid>
                </div>
              </Waypoint>
              <Scroll.Element name="2" />
              <Waypoint
                // tslint:disable-next-line:jsx-no-lambda
                onEnter={() => {
                  this.handleWayPoint(2);
                }}
              >
                <div>
                  <Grid item={true} className={classes.itemGrid}>
                    <Typography
                      variant="headline"
                      component="h2"
                      gutterBottom={true}
                    >
                      Commentaires
                    </Typography>
                    <Grid container={true}>
                      {this.props.comments !== undefined &&
                        this.props.comments.slice(0, 3).map((comment, i) => (
                          <>
                            <Grid
                              key={comment.id}
                              item={true}
                              className={classes.commentBlock}
                            >
                              <CommentBlock
                                comment={comment.comment}
                                date={comment.date}
                                name={comment.name}
                                picture={comment.picture}
                                stars={comment.stars}
                              />
                            </Grid>
                            {i !== 2 && (
                              <Grid item={true} xs={12}>
                                <Divider />
                              </Grid>
                            )}
                          </>
                        ))}
                    </Grid>
                  </Grid>
                </div>
              </Waypoint>
              <Scroll.Element name="3" />
              <Waypoint
                // tslint:disable-next-line:jsx-no-lambda
                onEnter={() => {
                  this.handleWayPoint(3);
                }}
              >
                <div>
                  <Grid item={true} className={classes.itemGrid}>
                    <Typography
                      variant="headline"
                      component="h2"
                      gutterBottom={true}
                    >
                      Informations complémentaires
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      paragraph={true}
                      className={classes.paragraph}
                    >
                      {this.props.furtherInformation}
                    </Typography>
                  </Grid>
                </div>
              </Waypoint>
            </Grid>
          </Grid>
          <Grid item={true} xs={4}>
            <Typography variant="headline" component="h3">
              Faites votre réservation :
            </Typography>
            <div className={classes.sticky}>
              <Paper elevation={1} className={classes.infoReservartion}>
                <BookForm
                  price={this.props.price}
                  availableSeat={this.props.availableSeat}
                  dayEndBook={this.props.dayEndBook}
                />
              </Paper>
              <Grid
                container={true}
                direction="column"
                justify="space-around"
                alignItems="center"
                className={classes.innerGrid}
              >
                <Grid item={true} className={classes.itemGrid}>
                  <Grid container={true}>
                    <Lock />
                    <Typography variant="body1">
                      Paiement sécurisé par Mangopay
                    </Typography>
                  </Grid>
                  <Grid
                    container={true}
                    alignItems="center"
                    justify="space-around"
                  >
                    <Grid item={true}>
                      <img
                        src="https://static.cuistotducoin.com/img/workshop/visa.png"
                        alt="visa"
                        height="24"
                        width="40"
                      />
                      <img
                        src="https://static.cuistotducoin.com/img/workshop/masterpass.png"
                        alt="masterpass"
                        height="24"
                        width="40"
                      />
                      <img
                        src="https://static.cuistotducoin.com/img/workshop/maestro.png"
                        alt="maestro"
                        height="24"
                        width="40"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item={true} className={classes.itemGrid}>
                  <Grid container={true}>
                    <Typography
                      variant="body1"
                      onMouseEnter={this.handlePopoverOpen}
                      onMouseLeave={this.handlePopoverClose}
                    >
                      Conditions d'annulation
                    </Typography>
                    <Popover
                      className={classes.popover}
                      open={open}
                      anchorEl={this.state.popoverAnnulation}
                      anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom"
                      }}
                      transformOrigin={{
                        horizontal: "left",
                        vertical: "top"
                      }}
                      onClose={this.handlePopoverClose}
                      disableRestoreFocus={true}
                    >
                      <Paper elevation={2} className={classes.cancellation}>
                        <Typography variant="body1">
                          Les conditions d'annulation sont les suivantes : Si
                          vous annulez jusqu'à 3 jours avant la date de
                          l'atelier, vous recevez un remboursement intégral
                          (minoré des frais de service). En cas d'annulation
                          dans les 3 jours précédant l'atelier, la réservation
                          n'est pas remboursable.
                        </Typography>
                      </Paper>
                    </Popover>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Poser une question au cuistot
                </Button>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }

  private scrolltoElement = element => {
    Scroll.scroller.scrollTo(element, {
      delay: 100,
      duration: 500,
      smooth: true
    });
  };
}

export default withStyles(styles as any)(Workshop as any) as any;
