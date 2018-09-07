import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Theme, withStyles } from "@material-ui/core/styles";
import { API, graphqlOperation } from "aws-amplify";
import { AppContainer } from "components/App";
import { Field, Form, Formik } from "formik";
import { Switch, TextField } from "formik-material-ui";
import { CreateCook } from "queries";
import React from "react";
import { compose } from "recompose";
import { Subscribe } from "unstated";
import * as Yup from "yup";
import { sirenValidation } from "../../shared/validations";

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
  legal_first_name: string;
  legal_last_name: string;
  legal_birthdate: string;
}

export class BecomeCookForm extends React.Component<IBecomeCookFormProps, {}> {
  public constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    const { classes } = this.props;

    const validationSchema = Yup.object().shape({
      pro_email: Yup.string()
        .email("Veuillez saisir une adresse email valide"),
      siren: sirenValidation(),
    });

    const becomeCookFormComponent = ({ values }) => {
      return (
        <Form autoComplete="off">
          <Grid container={true} className={classes.grid} spacing={16}>
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
                    label="Email professionnel"
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
            initialValues={initialValues}
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
    const { is_pro, business_name, siren, pro_email, legal_first_name, legal_last_name, legal_birthdate } = values;
    const { currentGourmet, openSnackbar } = this.props;
    API.graphql(
      graphqlOperation(CreateCook, {
        cook: {
          gourmet: {
            id: currentGourmet.id,
          },
          is_pro,
          business_name,
          siren,
          pro_email,
          legal_first_name,
          legal_last_name,
          legal_birthdate: legal_birthdate || null,
        }
      })
    ).then(createResult => {
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