import React from 'react';
import {
  Edit,
  SimpleForm,
  DateInput,
  DisabledInput,
  TextInput,
  BooleanInput,
} from 'react-admin';
import { CookNameField } from '../fields';

const CookEdit = props => (
  <Edit title={<CookNameField />} {...props}>
    <SimpleForm>
      <DisabledInput label="Id" source="id" />
      <BooleanInput source="is_pro" />
      <TextInput source="business_name" />
      <TextInput source="siren" />
      <TextInput source="pro_email" />
      <TextInput source="legal_first_name" />
      <TextInput source="legal_last_name" />
      <DateInput source="legal_birthdate" />
    </SimpleForm>
  </Edit>
);

export default CookEdit;
