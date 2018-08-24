import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  required,
  DateInput,
} from 'react-admin';
import { GourmetNameField } from '../fields';

const CookCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <BooleanInput source="is_pro" />
      <ReferenceInput source="gourmet.id" reference="gourmets" validate={required()}>
        <SelectInput optionText={<GourmetNameField />} />
      </ReferenceInput>
      <TextInput source="business_name" />
      <TextInput source="siren" />
      <TextInput source="pro_email" />
      <TextInput source="legal_first_name" />
      <TextInput source="legal_last_name" />
      <DateInput source="legal_birthdate" />
    </SimpleForm>
  </Create>
);

export default CookCreate;
