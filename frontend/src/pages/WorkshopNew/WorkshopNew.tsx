import { MenuItem } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import KitchenIcon from "@material-ui/icons/LocationOn";
import WorkshopIcon from "@material-ui/icons/RestaurantMenu";
import { API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import Layout from "components/Layout";
import Loading from "components/Loading";
import ProgressBar from "components/ProgressBar";
import WizardForm from "components/WizardForm";
import { Field } from "formik";
import { Select, TextField } from "formik-material-ui";
import get from 'lodash.get';
import moment from 'moment';
import { CreateWorkshop } from "queries";
import React from "react";
import InputRange from "react-input-range";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";
import * as Yup from "yup";

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
  }
};

interface IWorkshopNewProps {
  classes: any;
  currentGourmet: any;
  openSnackbar(message: string, variant: string);
}

const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Vous devez entrer un nom pour cet atelier"),
  // price: Yup.number().required("Veuillez entrer un prix").positive(),
  // duration: Yup.number().required("Veuillez entrer la durée estimée de votre atelier en minutes").positive(),
  // date: Yup.string().required("Veuillez entrer la date à laquelle aura lieu votre atelier")
});

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

const getCook = `query GetCook($cook_id: ID!) {
  getCook(cook_id: $cook_id) {
    cook {
      confirmed
    }
    message
    errors {
      message
    }
  }
}`;

class WorkshopNew extends React.Component<IWorkshopNewProps> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public onSubmit(values, { setSubmitting, setErrors, setStatus }) {
    const { currentGourmet, openSnackbar } = this.props;
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

    console.log(workshop);

    // API.graphql(graphqlOperation(CreateWorkshop, { workshop })).then(res => {
    //   const result = res.data.createWorkshop;
    //   setSubmitting(false);
    //   if (result.message === "success") {
    //     openSnackbar("Votre atelier a bien été crée", "success");
    //     setStatus({ success: true });
    //   } else {
    //     openSnackbar("Échec lors de la création de votre atelier. Veuillez réessayer", "error");
    //     setStatus({ success: false });
    //     if (result.errors.length) {
    //       const error = result.errors[0].message;
    //       console.error(error);
    //       setErrors({ submit: error });
    //     }
    //   }
    // });
  }

  public render() {
    const { classes, currentGourmet } = this.props;

    return (
      <Layout pageName="workshopNew">
        <Connect query={graphqlOperation(getCook, { cook_id: currentGourmet.id })}>
          {({ data, errors }) => {
            if (get(errors, 'length')) {
              if (errors[0].message === 'resource not found') {
                return <Redirect to="/404" />;
              }
            }

            if (!data.getCook) {
              return <Loading />;
            }

            const cook = data.getCook.cook;

            if (!cook.confirmed) {
              return <Redirect to="/404" />
            }

            return (
              <WizardForm
                className={classes.form}
                initialValues={initialValues}
                onSubmit={this.onSubmit}
                renderProgressBar={(page) => (
                  <ProgressBar
                    className={classes.progressBar}
                    icons={[{ icon: WorkshopIcon }, { icon: KitchenIcon }]}
                    page={page}
                  />
                )}
                validationSchema={validationSchema}
              >
                <WizardForm.Page>
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
                <WizardForm.Page>
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
                      <Field
                        component={Select}
                        name="kitchenId"
                        label="Lieu partenaire"
                        className={classes.textField}
                        margin="normal"
                      >
                        <MenuItem value="toto">Toto</MenuItem>
                        {/* {[...Array(this.props.availableSeat)].map((e, i) => {
                          return (
                            <MenuItem key={i + 1} value={i + 1}>
                              {i + 1}
                            </MenuItem>
                          );
                        })} */}
                      </Field>
                    </Grid>
                  </Grid>
                </WizardForm.Page>
              </WizardForm>
            );
          }}
        </Connect>
      </Layout>
    );
  }
};

const enhance = compose(
  withStyles(styles as any),
);

export default enhance(WorkshopNew);
