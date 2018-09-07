import React from 'react';
import {
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
  ReferenceField,
  BooleanField,
  EmailField,
} from 'react-admin';
import { CookNameField, GourmetNameField } from '../fields';

const CookShow = props => (
  <Show title={<CookNameField />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <BooleanField source="confirmed" />
      <ReferenceField reference="gourmets" source="gourmet.id" linkType="show">
        <GourmetNameField />
      </ReferenceField>
      <BooleanField source="is_pro" />
      <TextField source="business_name" />
      <TextField source="siren" />
      <EmailField source="pro_email" />
      <TextField source="legal_first_name" />
      <TextField source="legal_last_name" />
      <DateField source="legal_birthdate" />
    </SimpleShowLayout>
  </Show>
);

export default CookShow;
