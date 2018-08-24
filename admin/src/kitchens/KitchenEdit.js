import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  DisabledInput,
  required,
} from 'react-admin';
import { NameField } from '../fields';

const KitchenEdit = props => (
  <Edit title={<NameField />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="address" validate={required()} />
      <TextInput source="city" validate={required()} />
      <TextInput source="zip_code" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default KitchenEdit;
