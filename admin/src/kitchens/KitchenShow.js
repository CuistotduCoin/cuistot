import React from 'react';
import {
  TextField,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import { NameField, LocationField } from '../fields';

const KitchenShow = props => (
  <Show title={<NameField />} {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="address" />
      <TextField source="city" />
      <TextField source="zip_code" />
      <LocationField />
    </SimpleShowLayout>
  </Show>
);

export default KitchenShow;
