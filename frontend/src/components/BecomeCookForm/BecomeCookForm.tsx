import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { API, graphqlOperation } from "aws-amplify";
import { AppContainer } from "components/App";
import Loading from "components/Loading";
import { Field, Form, Formik } from "formik";
import { Switch, TextField } from "formik-material-ui";
import { CreateCook } from "queries";
import React from "react";
import { compose } from "recompose";
import { Subscribe } from "unstated";
import * as Yup from "yup";
import { phoneNumberValidation, sirenValidation } from "../../shared/validations";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 540,
    padding: 24
  },
  textField: {
    width: "100%"
  },
  submitButton: {
    marginTop: "30px"
  },
  isPro: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  isProLabel: {
    color: theme.palette.text.secondary
  }
});

const initialValues = {
  is_pro: true,
  business_name: "",
  siren: "",
  pro_email: "",
  pro_phone_number: "",
  legal_first_name: "",
  legal_last_name: "",
  legal_birthdate: ""
};

interface IBecomeCookFormProps {
  classes?: any;
  currentGourmet: any;
  openSnackbar(message: string, variant: string);
}

interface IBecomeCookFormValues {
  is_pro: boolean;
  business_name: string;
  siren: string;
  pro_email: string;
  pro_phone_number: string;
  legal_first_name: string;
  legal_last_name: string;
  legal_birthdate: string;
}

const validationSchema = Yup.object().shape({
  pro_email: Yup.string()
    .email("Veuillez saisir une adresse email valide"),
  siren: sirenValidation(),
  pro_phone_number: phoneNumberValidation(true),
});

export class BecomeCookForm extends React.Component<IBecomeCookFormProps, {}> {
  public constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    const { classes, currentGourmet } = this.props;

    if (!currentGourmet) {
      return <Loading />;
    }

    const becomeCookFormComponent = ({ values }) => {
      return (
        <Form autoComplete="off">
          <Grid container={true} className={classes.grid} spacing={16}>
            <Grid item={true} xs={12}>
              <Grid container={true}>
                <Field
                  type="text"
                  component={TextField}
                  id="pro_phone_number"
                  label="Numéro de téléphone pro."
                  name="pro_phone_number"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <div className={classes.isPro}>
                <Field
                  id="is_pro"
                  name="is_pro"
                  type="checkbox"
                  checked={values.is_pro}
                  component={Switch}
                />
                <span className={classes.isProLabel}>Vous êtes un(e) professionnel(le) ?</span>
              </div>
            </Grid>
            {values.is_pro && (
              <>
                <Grid item={true} xs={12}>
                  <Field
                    id="business_name"
                    name="business_name"
                    label="Nom de la société"
                    className={classes.textField}
                    margin="normal"
                    type="text"
                    component={TextField}
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Field
                    type="text"
                    component={TextField}
                    id="siren"
                    label="SIREN"
                    name="siren"
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Field
                    type="text"
                    component={TextField}
                    id="pro_email"
                    label="Email pro."
                    name="pro_email"
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
                <Grid item={true} xs={12}>
                  <Grid container={true} spacing={16}>
                    <Grid item={true} xs={6}>
                      <Field
                        id="legal_first_name"
                        name="legal_first_name"
                        label="Prénom du représentant légal"
                        className={classes.textField}
                        margin="normal"
                        type="text"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item={true} xs={6}>
                      <Field
                        id="legal_last_name"
                        name="legal_last_name"
                        label="Nom du représentant légal"
                        className={classes.textField}
                        margin="normal"
                        type="text"
                        component={TextField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item={true} xs={12}>
                  <Field
                    component={TextField}
                    type="date"
                    id="legal_birthdate"
                    label="Date d'immatriculation de la société"
                    name="legal_birthdate"
                    className={classes.textField}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </>
            )}
            <Grid item={true} xs={12}>
              <Grid container={true} justify="center">
                <Button type="submit" variant="contained" color="secondary" className={classes.submitButton}>
                  Devenir cuistot
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      );
    }

    return (
      <Subscribe to={[AppContainer]}>
        {(app: any) => (
          <Formik
            initialValues={Object.assign({}, initialValues, {
              pro_email: currentGourmet.email,
              pro_phone_number: currentGourmet.phone_number || '',
              legal_first_name: currentGourmet.first_name,
              legal_last_name: currentGourmet.last_name,
            })}
            component={becomeCookFormComponent}
            onSubmit={this.onSubmit}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
          />
        )}
      </Subscribe>
    );
  }

  public onSubmit(
    values: IBecomeCookFormValues,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) {
    const {
      is_pro,
      business_name,
      siren,
      pro_email,
      pro_phone_number,
      legal_first_name,
      legal_last_name,
      legal_birthdate,
    } = values;
    const { currentGourmet, openSnackbar } = this.props;

    const cook = {
      gourmet: {
        id: currentGourmet.id,
      },
      is_pro,
      pro_phone_number
    };

    if (is_pro) {
      Object.assign(cook, {
        business_name,
        siren,
        pro_email,
        legal_first_name,
        legal_last_name,
        legal_birthdate: legal_birthdate || null,
      });
    }

    API.graphql(graphqlOperation(CreateCook, { cook })).then(createResult => {
      if (createResult.data.createCook.message === "success") {
        openSnackbar("Merci ! Nous vous contactons au plus vite pour convenir d'un rendez-vous", "success");
        setStatus({ success: true });
        resetForm(initialValues);
      } else {
        openSnackbar("Échec lors de la création de votre compte cuistot", "error");
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: createResult });
      }
    });
  }
}

const enhance = compose(withStyles(styles as any));

export default enhance(BecomeCookForm);