import React from 'react';
import {
  TextField,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import { NameField } from '../fields';

const KitchenShow = props => (
  <Show title={<NameField />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="address" />
      <TextField source="city" />
      <TextField source="zip_code" />
      <TextField source="location" />
    </SimpleShowLayout>
  </Show>
);

export default KitchenShow;
