import { API, graphqlOperation } from "aws-amplify";
import { AppContainer } from "components/App";
import CookForm from "components/CookForm";
import Loading from "components/Loading";
import { Formik } from "formik";
import { CreateCook } from "queries";
import React from "react";
import { Subscribe } from "unstated";
import * as Yup from "yup";
import { phoneNumberValidation, sirenValidation } from "../../shared/validations";

const initialValues = {
  is_pro: true,
  description: "",
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
  description: string;
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
    .nullable(true)
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
            component={({ values }) => <CookForm action="create" values={values} />}
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
      description,
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
      description,
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

export default BecomeCookForm;