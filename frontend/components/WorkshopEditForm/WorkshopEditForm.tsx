import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { Form, Formik } from "formik";
import Router from "next/router";
import React from "react";
import { graphql, Query } from "react-apollo";
import { compose } from "recompose";;
import WarningIcon from "@material-ui/icons/Warning";
import * as Yup from "yup";
import Loading from "../../components/Loading";
import WorkshopForm from "../../components/WorkshopForm";
import { withRedirect } from "../../decorators";
import { DeleteWorkshop, GetWorkshop, UpdateWorkshop  } from "../../queries";
import { format } from "../../shared/date-utils";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 540,
    padding: 24
  },
  textField: {
    width: "100%"
  },
  card: {
    width: "60vw",
    margin: "15px 0 50px"
  },
  button: {
    marginBottom: 50
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submitButton: {
    marginTop: 30
  },
  warningIcon: {
    color: 'white',
    marginRight: theme.spacing.unit
  }
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Vous devez entrer un nom pour cet atelier"),
  price: Yup.number().required("Veuillez entrer un prix").positive(),
  duration: Yup.number().required("Veuillez entrer la durée estimée de votre atelier en minutes").positive(),
  date: Yup.string().required("Veuillez entrer la date à laquelle aura lieu votre atelier")
});

interface IGourmetRange {
  min: number;
  max: number;
}

interface IWorkshopEditFormValues {
  name: string;
  description?: string;
  price: string;
  duration: string;
  date: string;
  gourmetRange: IGourmetRange;
};

interface IWorkshopEditFormProps {
  classes: any;
  workshopId: string;
  currentGourmet: any;
  redirectToNotFound();
  openSnackbar(message: string, variant: string);
  updateWorkshop(workshop: object);
  deleteWorkshop(workshopId: string);
}

class WorkshopEditForm extends React.Component<IWorkshopEditFormProps> {
  public constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteWorkshop = this.deleteWorkshop.bind(this);
  }

  public render() {
    const { classes, workshopId, redirectToNotFound, currentGourmet } = this.props;

    if (!currentGourmet) {
      return <Loading />; // will be handled by WithAuthDecorator when the issue with it will be fixed
    }

    const updateWorkshopComponent = () => (
      <Form autoComplete="off">
        <WorkshopForm />
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="secondary" className={classes.submitButton}>
            Mettre à jour l'atelier
          </Button>
        </Grid>
      </Form>
    );

    return (
      <Query query={GetWorkshop} variables={{ workshop_id: workshopId }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          // catch resource not found here
          if (error) return `Error: ${error}`;

          const workshop = data.getWorkshop.workshop;

          if (!workshop.confirmed || workshop.cook.id !== currentGourmet.id) {
            redirectToNotFound();
          }

          const {
            name,
            description,
            price,
            duration,
            date,
            min_gourmet,
            max_gourmet,
          } = workshop;

          return (
            <div className={classes.container}>
              <Card className={classes.card}>
                <CardContent>
                  <span>Les photos de l'atelier</span>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Formik
                    initialValues={{
                      name,
                      description,
                      price,
                      duration,
                      date: format(date, "YYYY-MM-DD"),
                      gourmetRange: { min: min_gourmet, max: max_gourmet },
                    }}
                    component={updateWorkshopComponent}
                    onSubmit={this.onSubmit}
                    validationSchema={validationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                  />
                </CardContent>
              </Card>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.deleteWorkshop}
                className={classes.button}
              >
                <WarningIcon className={classes.warningIcon} />
                Supprimer l'atelier
              </Button>
            </div>
          );
        }}
      </Query>
    );
  }

  public onSubmit(values: IWorkshopEditFormValues, { setSubmitting, setErrors, setStatus }) {
    const { workshopId, openSnackbar, updateWorkshop } = this.props;

    const {
      name,
      description,
      price,
      duration,
      date,
      gourmetRange,
    } = values;

    const workshop = {
      id: workshopId,
      name,
      description,
      price,
      duration,
      min_gourmet: gourmetRange.min,
      max_gourmet: gourmetRange.max,
      date,
    };
  
    const updateWorkshopError = (result) => {
      openSnackbar("Échec de la mise à jour de l'atelier", "error");
      setStatus({ success: false });
      setSubmitting(false);
      if (result.errors.length) {
        const error = result.errors[0].message;
        console.error(error);
        setErrors({ submit: error });
      }
    };

    updateWorkshop(workshop)
      .then(res => {
        const result = res.data.updateWorkshop;
        if (result.message === "success") {
          openSnackbar("Les informations ont bien été mises à jour", "success");
          setStatus({ success: true });
          setSubmitting(false);
        } else {
          updateWorkshopError(result);
        }
      })
      .catch(updateWorkshopError);
  }

  public deleteWorkshop() {
    const { workshopId, openSnackbar, deleteWorkshop } = this.props;

    const deleteWorkshopError = (result) => {
      openSnackbar("Erreur lors de la suppression de l'atelier. Veuillez réessayer.", "error");
      if (result.errors.length) {
        const error = result.errors[0].message;
        console.error(error);
      }
    };

    deleteWorkshop(workshopId)
      .then(res => {
        const result = res.data.deleteWorkshop;
        if (result.message === "success") {
          openSnackbar("L'atelier a bien été supprimé", "success");
          Router.replace("/");
        } else {
          deleteWorkshopError(result);
        }
      })
      .catch(deleteWorkshopError);
  }
}

const enhance = compose(
  graphql(UpdateWorkshop, {
    props: (props: any) => ({
      updateWorkshop: (workshop) => props.mutate({ variables: { workshop } }),
    }),
  }),
  graphql(DeleteWorkshop, {
    props: (props: any) => ({
      deleteWorkshop: (workshopId) => props.mutate({ variables: { workshop_id: workshopId } }),
    }),
  }),
  withRedirect,
  withStyles(styles as any)
);

export default enhance(WorkshopEditForm);
