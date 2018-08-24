import React from 'react';
import {
  TextField,
  EmailField,
  DateField,
  RichTextField,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import { GourmetNameField } from '../fields';

const GourmetShow = props => (
  <Show title={<GourmetNameField />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <RichTextField source="description" />
      <TextField source="gender" />
      <DateField source="birthdate" />
      <TextField source="address" />
      <TextField source="city" />
      <TextField source="zip_code" />
      <TextField source="location" />
    </SimpleShowLayout>
  </Show>
);

export default GourmetShow;
