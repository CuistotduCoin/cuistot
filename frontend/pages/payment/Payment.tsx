import { Divider, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import { Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Layout from "../../components/Layout";
import PaymentCardForm from "../../components/PaymentCardForm";

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
          <Grid container className={classes.grid}>
            <Grid item xs={8}>
              <Typography variant="title" component="p" gutterBottom>
                Recontrez {this.props.nameCook}
              </Typography>
              <Typography variant="headline" component="h2" gutterBottom>
                {this.props.name}
              </Typography>
              <Typography
                variant="subheading"
                component="p"
                gutterBottom
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
            <Grid item xs={4}>
              <Paper elevation={1} className={classes.infoReservartion}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      {this.props.price}€ x 2 Gourmets
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      100€
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      frais de service
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      20€
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom
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
          <Grid container className={classes.grid}>
            <Grid item xs={8}>
              <PaymentCardForm />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNextStep}
              >
                Confirmer et payer
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={1} className={classes.infoReservartion}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      {this.props.price}€ x 2 Gourmets
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      100€
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      frais de service
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      20€
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      Total
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="right"
                      variant="subheading"
                      component="p"
                      gutterBottom
                    >
                      120€
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  }

  public render() {
    const { classes } = this.props;
    const steps = ["Récapitulatif", "Paiement", "Infos"];

    return (
      <Layout headerProps={{ static: true, hideCompanyIndividual: true }}>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          spacing={16}
          className={classes.grid}
        >
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography variant="title">
              Paiement - {steps[this.state.activeStep]}
            </Typography>
          </Grid>
          <Grid item>
            <Stepper activeStep={this.state.activeStep} alternativeLabel>
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
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {this.state.activeStep <= steps.length &&
          this.getStepContent(this.state.activeStep)}
      </Layout>
    );
  }
}

export default withStyles(styles as any)(Payment as any) as any;
