import React from 'react';
import {
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
  ReferenceField,
  BooleanField,
  EmailField,
  RichTextField,
} from 'react-admin';
import { CookNameField, GourmetNameField } from '../fields';

const CookShow = props => (
  <Show title={<CookNameField />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <BooleanField source="confirmed" />
      <BooleanField source="is_pro" />
      <ReferenceField reference="gourmets" source="gourmet.id" linkType="show">
        <GourmetNameField />
      </ReferenceField>
      <RichTextField source="description" />
      <TextField source="business_name" />
      <TextField source="siren" />
      <EmailField source="pro_email" />
      <TextField source="pro_phone_number" />
      <TextField source="legal_first_name" />
      <TextField source="legal_last_name" />
      <DateField source="legal_birthdate" />
    </SimpleShowLayout>
  </Show>
);

export default CookShow;
