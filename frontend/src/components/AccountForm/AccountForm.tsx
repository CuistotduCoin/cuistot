import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { Theme, withStyles } from "@material-ui/core/styles";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import CookForm from "components/CookForm";
import Loading from "components/Loading";
import ProfileImageUploader from "components/ProfileImageUploader";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import get from "lodash.get";
import moment from "moment";
import { GetCook, UpdateCook, UpdateGourmet } from "queries";
import React from "react";
import { compose } from "recompose";
import * as Yup from "yup";
import { PASSWORD_TEXT_HELPER } from '../../shared/constants';
import {
  passwordConfirmationValidation,
  passwordValidation,
  phoneNumberValidation,
  sirenValidation,
  zipCodeValidation,
} from "../../shared/validations";

const styles = (theme: Theme) => ({
  grid: {
    margin: "0px auto",
    maxWidth: 540,
    padding: 24
  },
  textField: {
    width: "100%"
  },
  block: {
    display: "flex",
    alignItems: "center"
  },
  genderSelect: {
    paddingTop: "23px"
  },
  card: {
    width: "50vw",
    margin: "15px 0 15px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submitButton: {
    marginTop: "30px"
  }
});

const infoValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("Un prénom est obligatoire"),
  last_name: Yup.string().required("Un nom est obligatoire"),
  zip_code: zipCodeValidation(),
  phone_number: phoneNumberValidation(),
});

const cookInfoValidationSchema = Yup.object().shape({
  pro_email: Yup.string()
    .nullable(true)
    .email("Veuillez saisir une adresse email valide"),
  siren: sirenValidation(),
  pro_phone_number: phoneNumberValidation(true),
});

const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required(
    "Une formalité pour être sûr qu'il s'agit bien de vous"
  ),
  newPassword: passwordValidation(),
  newPasswordConfirmation: passwordConfirmationValidation("newPassword")
});

const passwordInitialValues = {
  oldPassword: "",
  newPassword: "",
  newPasswordConfirmation: ""
};

interface IUpdateInfoFormValues {
  username: string;
  gender: string;
  first_name: string;
  last_name: string;
  email: string;
  description: string;
  birthdate: string;
  phone_number: string;
  address: string;
  city: string;
  zip_code: string;
}

interface IUpdateCookInfoFormValues {
  is_pro: boolean;
  business_name?: string;
  description: string;
  siren?: string;
  pro_email?: string;
  pro_phone_number: string;
  legal_first_name?: string;
  legal_last_name?: string;
  legal_birthdate?: string;
}

interface IUpdatePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

interface IAccountFormProps {
  classes: any;
  currentGourmet: any;
  openSnackbar(message: string, variant: string);
  setCurrentGourmet(gourmet?: object);
}

interface IAccountFormState {
  imageSrc?: any;
}

export class AccountForm extends React.Component<
  IAccountFormProps,
  IAccountFormState
> {
  public constructor(props) {
    super(props);
    this.onNewInfoSubmit = this.onNewInfoSubmit.bind(this);
    this.onNewCookInfoSubmit = this.onNewCookInfoSubmit.bind(this);
    this.onNewPasswordSubmit = this.onNewPasswordSubmit.bind(this);
  }

  public render() {
    const { classes, currentGourmet } = this.props;

    const updateInfoFormComponent = () => (
      <Form autoComplete="off">
        <Grid container={true} className={classes.grid} spacing={16}>
          <Grid item={true} xs={12}>
            <Grid item={true} xs={12}>
              <Grid container={true}>
                <Field
                  type="text"
                  component={TextField}
                  id="username"
                  label="Nom d'utilisateur"
                  name="username"
                  className={classes.textField}
                  margin="normal"
                  disabled
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true}>
                <Field
                  type="text"
                  component={TextField}
                  id="email"
                  label="Email"
                  name="email"
                  className={classes.textField}
                  margin="normal"
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container={true} spacing={16} className={classes.block}>
              <Grid item={true} xs={2}>
                <Field
                  id="gender"
                  name="gender"
                  component={Select}
                  className={classes.genderSelect}
                >
                  <MenuItem value="M">Mr.</MenuItem>
                  <MenuItem value="F">Mme</MenuItem>
                  <MenuItem value="U">Autre</MenuItem>
                </Field>
              </Grid>
              <Grid item={true} xs={5}>
                <Field
                  id="firstname"
                  name="first_name"
                  label="Prénom"
                  className={classes.textField}
                  margin="normal"
                  type="text"
                  component={TextField}
                />
              </Grid>
              <Grid item={true} xs={5}>
                <Field
                  id="lastname"
                  name="last_name"
                  label="Nom"
                  className={classes.textField}
                  margin="normal"
                  type="text"
                  component={TextField}
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true}>
                <Field
                  component={TextField}
                  type="date"
                  id="birthdate"
                  label="Date de naissance"
                  name="birthdate"
                  className={classes.textField}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true}>
                <Field
                  type="text"
                  component={TextField}
                  id="phone_number"
                  label="Numéro de téléphone"
                  name="phone_number"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true}>
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
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true}>
                <Field
                  type="text"
                  component={TextField}
                  id="address"
                  label="Adresse"
                  name="address"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true}>
                <Field
                  type="text"
                  component={TextField}
                  id="city"
                  label="Ville"
                  name="city"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true}>
                <Field
                  type="text"
                  component={TextField}
                  id="zipCode"
                  label="Code postal"
                  name="zip_code"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid item={true} xs={12}>
              <Grid container={true} justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.submitButton}
                >
                  Mettre à jour mes infos Gourmet
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    );

    const updatePasswordFormComponent = () => (
      <Form autoComplete="off">
        <Grid container={true} className={classes.grid} spacing={16}>
          <Grid item={true} xs={12}>
            <Grid container={true}>
              <Field
                type="password"
                component={TextField}
                id="oldPassword"
                label="Votre mot de passe actuel"
                name="oldPassword"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container={true}>
              <Field
                type="password"
                component={TextField}
                id="newPassword"
                label="Votre nouveau mot de passe"
                helperText={PASSWORD_TEXT_HELPER}
                name="newPassword"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container={true}>
              <Field
                type="password"
                component={TextField}
                id="newPasswordConfirmation"
                label="Confirmation de votre nouveau mot de passe"
                name="newPasswordConfirmation"
                className={classes.textField}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid item={true} xs={12}>
            <Grid container={true} justify="center">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submitButton}
              >
                Mettre à jour mon mot de passe
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    );

    const {
      username,
      gender,
      first_name,
      last_name,
      email,
      description,
      birthdate,
      phone_number,
      address,
      city,
      zip_code
    } = currentGourmet;

    return (
      <Connect query={graphqlOperation(GetCook, { cook_id: currentGourmet.id })}>
        {({ data }) => {
          let cookCard;
          if (get(data, 'getCook.message') === "success" && get(data, 'getCook.cook.confirmed')) {
            const {
              is_pro,
              description,
              business_name,
              siren,
              pro_email,
              pro_phone_number,
              legal_first_name,
              legal_last_name,
              legal_birthdate,
            } = data.getCook.cook;

            cookCard = (
              <Card className={classes.card}>
                <CardContent>
                  <Formik
                    initialValues={{
                      is_pro,
                      business_name,
                      description,
                      siren,
                      pro_email,
                      pro_phone_number,
                      legal_first_name,
                      legal_last_name,
                      legal_birthdate: moment(legal_birthdate).format("YYYY-MM-DD")
                    }}
                    component={({ values }) => <CookForm action="update" values={values} />}
                    onSubmit={this.onNewCookInfoSubmit}
                    validationSchema={cookInfoValidationSchema}
                    validateOnChange={false}
                  />
                </CardContent>
              </Card>
            );
          }

          return (
            <div className={classes.container}>
              <Card className={classes.card}>
                <CardContent>
                  <ProfileImageUploader
                    imageKey={get(currentGourmet, 'image.key')}
                    identityId={currentGourmet.identity_id}
                  />
                  <Formik
                    initialValues={{
                      username,
                      gender,
                      first_name,
                      last_name,
                      email,
                      description,
                      birthdate: moment(birthdate).format("YYYY-MM-DD"),
                      phone_number,
                      address,
                      city,
                      zip_code
                    }}
                    component={updateInfoFormComponent}
                    onSubmit={this.onNewInfoSubmit}
                    validationSchema={infoValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                  />
                </CardContent>
              </Card>
              {cookCard}
              <Card className={classes.card}>
                <CardContent>
                  <Formik
                    initialValues={passwordInitialValues}
                    component={updatePasswordFormComponent}
                    onSubmit={this.onNewPasswordSubmit}
                    validationSchema={passwordValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                  />
                </CardContent>
              </Card>
            </div>
          );
        }}
      </Connect>
    );
  }

  public onNewInfoSubmit(
    values: IUpdateInfoFormValues,
    { setSubmitting, setErrors, setStatus }
  ) {
    const { currentGourmet, setCurrentGourmet, openSnackbar } = this.props;
    const {
      description,
      gender,
      first_name,
      last_name,
      birthdate,
      phone_number,
      address,
      city,
      zip_code
    } = values;

    const gourmet = {
      id: currentGourmet.id,
      description,
      gender,
      first_name,
      last_name,
      birthdate: birthdate || null,
      phone_number,
      address,
      city,
      zip_code
    };

    API.graphql(graphqlOperation(UpdateGourmet, { gourmet })).then(res => {
      const result = res.data.updateGourmet;
      setSubmitting(false);
      if (result.message === "success") {
        openSnackbar("Vos informations ont bien été mises à jour", "success");
        setStatus({ success: true });
        setCurrentGourmet(result.gourmet);
      } else {
        openSnackbar("Échec de la mise à jour de vos informations", "error");
        setStatus({ success: false });
        if (result.errors.length) {
          const error = result.errors[0].message;
          console.error(error);
          setErrors({ submit: error });
        }
      }
    });
  }

  public onNewCookInfoSubmit(
    values: IUpdateCookInfoFormValues,
    { setSubmitting, setErrors, setStatus }
  ) {
    const { currentGourmet, openSnackbar } = this.props;
    const {
      is_pro,
      description,
      business_name,
      siren,
      pro_email,
      pro_phone_number,
      legal_first_name,
      legal_last_name,
      legal_birthdate,
    } = values;

    const cook = {
      id: currentGourmet.id,
      is_pro,
      description,
      business_name,
      siren,
      pro_email,
      pro_phone_number,
      legal_first_name,
      legal_last_name,
      legal_birthdate: legal_birthdate || null,
    };

    API.graphql(graphqlOperation(UpdateCook, { cook })).then(res => {
      const result = res.data.updateCook;
      setSubmitting(false);
      if (result.message === "success") {
        openSnackbar("Vos informations ont bien été mises à jour", "success");
        setStatus({ success: true });
      } else {
        openSnackbar("Échec de la mise à jour de vos informations", "error");
        setStatus({ success: false });
        if (result.errors.length) {
          const error = result.errors[0].message;
          console.error(error);
          setErrors({ submit: error });
        }
      }
    });
  }

  public onNewPasswordSubmit(
    values: IUpdatePasswordFormValues,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) {
    const { openSnackbar } = this.props;
    const { oldPassword, newPassword } = values;
    Auth.currentAuthenticatedUser()
      .then(user => Auth.changePassword(user, oldPassword, newPassword))
      .then(data => {
        openSnackbar("Votre mot de passe a bien été mis à jour", "success");
        setStatus({ success: true });
        setSubmitting(false);
        resetForm(passwordInitialValues);
      })
      .catch(err => {
        openSnackbar("Échec de la mise à jour de votre mot de passe", "error");
        setStatus({ success: false });
        setSubmitting(false);
        setErrors({ submit: err });
      });
  }
}

const enhance = compose(withStyles(styles as any));

export default enhance(AccountForm);
