import * as Yup from "yup";

export const passwordValidation = () => (
  Yup.string()
    .min(8, "Votre mot de passe doit contenir au minimum 8 caractères")
    .matches(/[a-z]/, "Votre mot de passe doit contenir une minuscule")
    .matches(/[A-Z]/, "Votre mot de passe doit contenir une majuscule")
    .matches(/[0-9]/, "Votre mot de passe doit contenir un chiffre")
    .required("Un mot de passe est obligatoire")
);

export const passwordConfirmationValidation = (ref) => (
  Yup.string()
    .oneOf([Yup.ref(ref), null], "Les mots de passe doivent être identiques")
    .required("Confirmez le mot de passe")
);
