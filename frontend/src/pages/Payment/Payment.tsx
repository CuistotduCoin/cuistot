import { Divider, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "components/Footer";
import Head from "components/Head";
import Header from "components/Header";
import PaymentCardForm from "components/PaymentCardForm";
import React from "react";
import metaInfo from "shared/metaInfo";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 1080,
    padding: 24
  },
  infoReservartion: {
    padding: theme.spacing.unit * 2
  }
});

interface IPaymentProps {
  classes?: any;
  name: string;
  nameCook: string;
  date: string;
  price: number;
}

interface IPaymentState {
  activeStep: number;
}

export class Payment extends React.Component<IPaymentProps, IPaymentState> {
  public state = {
    activeStep: 0
  };

  public handleStep = step => () => {
    const { activeStep } = this.state;
    if (activeStep > step) {
      this.setState({
        activeStep: step
      });
    }
  };

  public handleNextStep = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  public handleSpecificStep = index => {
    this.setState({
      activeStep: index
    });
  };

  public getStepContent(stepIndex) {
    const { classes } = this.props;
    switch (stepIndex) {
      case 0:
        return (
          <Grid container={true} className={classes.grid}>
            <Grid item={true} xs={8}>
              <Typography variant="title" component="p" gutterBottom={true}>
                Recontrez {this.props.nameCook}
              </Typography>
              <Typography variant="headline" component="h2" gutterBottom={true}>
                {this.props.name}
              </Typography>
              <Typography
                variant="subheading"
                component="p"
                gutterBottom={true}
              >
                {this.props.date}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNextStep}
              >
                Continuer
              </Button>
            </Grid>
            <Grid item={true} xs={4}>
              <Paper elevation={1} className={classes.infoReservartion}>
                <Grid container={true}>
                  <Grid item={true} xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      {this.props.price}€ x 2 Gourmets
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      100€
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      frais de service
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      20€
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item={true} xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      Total
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      120€
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          // tslint:disable-next-line:no-unused-expression
          <Grid container={true} className={classes.grid}>
            <Grid item={true} xs={8}>
              <PaymentCardForm />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNextStep}
              >
                Confirmer et payer
              </Button>
            </Grid>
            <Grid item={true} xs={4}>
              <Paper elevation={1} className={classes.infoReservartion}>
                <Grid container={true}>
                  <Grid item={true} xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      {this.props.price}€ x 2 Gourmets
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      100€
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      frais de service
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      20€
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item={true} xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      Total
                    </Typography>
                  </Grid>
                  <Grid item={true} xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom={true}
                    >
                      120€
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        );

      case 2:
        return <div>yo</div>;

      default:
        return null;
    }
  }

  public render() {
    const { classes } = this.props;
    const steps = ["Récapitulatif", "Paiement", "Infos"];

    return (
      <>
        <Head
          title={metaInfo.metaInfo.payment.title}
          description={metaInfo.metaInfo.payment.description}
        />
        <Header static={true} hideCompanyIndividual={true} />
        <Grid
          container={true}
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Grid item={true} xs={12}>
            <Divider />
          </Grid>
          <Grid item={true}>
            <Typography variant="title">
              Paiement - {steps[this.state.activeStep]}
            </Typography>
          </Grid>
          <Grid item={true}>
            <Stepper activeStep={this.state.activeStep} alternativeLabel={true}>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepButton onClick={this.handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          <Grid item={true} xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {this.state.activeStep <= steps.length &&
          this.getStepContent(this.state.activeStep)}
        <Footer />
      </>
    );
  }
}

export default withStyles(styles as any)(Payment as any) as any;
