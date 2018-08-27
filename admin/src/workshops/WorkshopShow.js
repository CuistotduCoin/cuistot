import React from 'react';
import {
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
  ReferenceField,
} from 'react-admin';
import { CookNameField, NameField } from '../fields';

const WorkshopShow = props => (
  <Show title={<NameField />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="price" />
      <TextField source="duration" />
      <TextField source="min_gourmet" />
      <TextField source="max_gourmet" />
      <TextField source="description" />
      <DateField source="date" showTime />
      <ReferenceField reference="cooks" source="cook.id" linkType="show">
        <CookNameField />
      </ReferenceField>
      <ReferenceField reference="kitchens" source="kitchen.id" linkType="show">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export default WorkshopShow;
