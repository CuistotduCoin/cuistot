import { MenuItem } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import KitchenIcon from "@material-ui/icons/LocationOn";
import WorkshopIcon from "@material-ui/icons/RestaurantMenu";
import { ErrorMessage, Field } from "formik";
import { Select, TextField } from "formik-material-ui";
import gql from "graphql-tag";
import moment from "moment";
import React from "react";
import { graphql, Query } from "react-apollo";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { compose } from "recompose";
import * as Yup from "yup";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import WizardForm from "../../components/WizardForm";
import { withRedirect } from "../../decorators";
import { CreateWorkshop, GetKitchens } from "../../queries";

const styles = {
  form: {
    margin: '40px 0 40px'
  },
  progressBar: {
    marginBottom: '40px'
  },
  textField: {
    width: "100%"
  },
  gourmetRange: {
    margin: '30px 0 30px'
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
};

interface IWorkshopNewProps {
  classes: any;
  currentGourmet: any;
  openSnackbar(message: string, variant: string);
  redirectToNotFound();
  createWorkshop(workshop: object);
}

const initialValues = {
  name: '',
  description: '',
  price: '',
  duration: '',
  minGourmet: '',
  maxGourmet: '',
  date: moment().format("YYYY-MM-DD"),
  kitchenId: '',
  gourmetRange: { min: 4, max: 8 },
};

const getCook = gql`
  query GetCook($cook_id: ID!) {
    getCook(cook_id: $cook_id) {
      cook {
        confirmed
      }
      message
      errors {
        message
      }
    }
  }
`;

class WorkshopNew extends React.Component<IWorkshopNewProps> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public onSubmit(values, { setSubmitting, setErrors, setStatus }) {
    const { currentGourmet, openSnackbar, createWorkshop } = this.props;
    const {
      name,
      description,
      price,
      duration,
      date,
      gourmetRange,
      kitchenId,
    } = values;

    const workshop = {    
      name,
      description,
      price,
      duration,
      min_gourmet: gourmetRange.min,
      max_gourmet: gourmetRange.max,
      date,
      cook: {
        id: currentGourmet.id
      },
      kitchen: {
        id: kitchenId
      }
    };

    const createWorkshopError = (result) => {
      openSnackbar("Échec lors de la création de votre atelier. Veuillez réessayer", "error");
      setStatus({ success: false });
      setSubmitting(false);
      if (result.errors.length) {
        const error = result.errors[0].message;
        console.error(error);
        setErrors({ submit: error });
      }
    };

    createWorkshop(workshop)
      .then(res => {
        const result = res.data.createWorkshop;
        if (result.message === "success") {
          openSnackbar("Votre atelier a bien été crée", "success");
          setStatus({ success: true });
          setSubmitting(false);
        } else {
          createWorkshopError(result);
        }
      })
      .catch(createWorkshopError);
  }

  public render() {
    const { classes, currentGourmet, redirectToNotFound } = this.props;

    return (
      <Layout pageName="workshopNew">
        <Query query={getCook} variables={{ cook_id: currentGourmet.id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            // catch resource not found here
            if (error) return `Error: ${error}`;
            
            const cook = data.getCook.cook;

            if (!cook.confirmed) {
              redirectToNotFound();
            }

            return (
              <WizardForm
                className={classes.form}
                initialValues={initialValues}
                onSubmit={this.onSubmit}
                progressBarProps={{
                  className: classes.progressBar,
                  icons: [{ icon: WorkshopIcon }, { icon: KitchenIcon }]
                }}
              >
                <WizardForm.Page
                  validationSchema={Yup.object().shape({
                    name: Yup.string().required("Vous devez entrer un nom pour cet atelier"),
                    price: Yup.number().required("Veuillez entrer un prix").positive(),
                    duration: Yup.number().required("Veuillez entrer la durée estimée de votre atelier en minutes").positive(),
                    date: Yup.string().required("Veuillez entrer la date à laquelle aura lieu votre atelier")
                  })}
                >
                  <Typography
                    variant="headline"
                    align="center"
                    component="h1"
                    color="inherit"
                  >
                    Informations
                  </Typography>
                  <Grid container={true} spacing={16}>
                    <Grid item={true} xs={12}>
                      <Field
                        type="text"
                        component={TextField}
                        id="name"
                        label="Nom de l'atelier"
                        name="name"
                        className={classes.textField}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Field
                        type="text"
                        component={TextField}
                        id="description"
                        label="Description"
                        name="description"
                        className={classes.textField}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Field
                        type="text"
                        component={TextField}
                        id="price"
                        label="Prix"
                        name="price"
                        helperText="En € et par personne"
                        className={classes.textField}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Field
                        type="text"
                        component={TextField}
                        id="duration"
                        label="Durée"
                        name="duration"
                        helperText="En minutes"
                        className={classes.textField}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item={true} xs={12} className={classes.gourmetRange}>
                      <Field
                        name="gourmetRange"
                        render={({ field, form }) => (
                          <InputRange
                            maxValue={30}
                            minValue={2}
                            allowSameValues
                            // @ts-ignore
                            formatLabel={(val, type) => {
                              if (type === 'value') {
                                return val;
                              }
                              const label = `${val} gourmets`;
                              if (type === 'min') {
                                return `${label} min.`;
                              }
                              return `${label} max.`;
                            }}
                            value={field.value}
                            onChange={(val) => form.setFieldValue(field.name, val)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item={true} xs={12}>
                      <Field
                        component={TextField}
                        type="date"
                        id="date"
                        label="Date"
                        name="date"
                        className={classes.textField}
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                  </Grid>
                </WizardForm.Page>
                <WizardForm.Page
                  validationSchema={Yup.object().shape({
                    kitchenId: Yup.string().required("Vous devez nous proposer un lieu partenaire"),
                  })}
                >
                  <Typography
                    variant="headline"
                    align="center"
                    component="h1"
                    color="inherit"
                  >
                    Lieu souhaité
                  </Typography>
                  <Grid container={true} spacing={16}>
                    <Grid item={true} xs={12}>
                      <Query query={GetKitchens}>
                        {({ loading: kitchensLoading, error: kitchensError, data: kitchensData }) => {
                          if (kitchensLoading) return <Loading />;
                          if (kitchensError) return `Error: ${error}`;
                          const kitchens = kitchensData.getKitchens.kitchens.edges;
                          return (
                            <>
                              <Field
                                component={Select}
                                name="kitchenId"
                                label="Lieu partenaire"
                                className={classes.textField}
                                margin="normal"
                              >
                                {kitchens.map(kitchen => (
                                  <MenuItem key={kitchen.node.id} value={kitchen.node.id}>
                                    {kitchen.node.name}
                                  </MenuItem>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="kitchenId"
                                component="div"
                                // @ts-ignore
                                className={classes.error}
                              />
                            </>
                          );
                        }}
                      </Query>
                    </Grid>
                  </Grid>
                </WizardForm.Page>
              </WizardForm>
            );
          }}
        </Query>
      </Layout>
    );
  }
};

const enhance = compose(
  withRedirect,
  graphql(CreateWorkshop, {
    props: (props: any) => ({
      createWorkshop: (workshop) => props.mutate({ variables: { workshop } }),
    }),
  }),
  withStyles(styles as any),
);

export default enhance(WorkshopNew);