import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import { validateZipCode } from '../utils';

const KitchenCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="address" validate={required()} />
      <TextInput source="city" validate={required()} />
      <TextInput source="zip_code" validate={[required(), validateZipCode]} />
    </SimpleForm>
  </Create>
);

export default KitchenCreate;
