import React from 'react';
import {
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
} from 'react-admin';
import WorkshopPrice from './WorkshopPrice';

const WorkshopShow = props => (
  <Show title="Workshop view" {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <WorkshopPrice />
      <TextField source="duration" />
      <TextField source="min_gourmet" />
      <TextField source="max_gourmet" />
      <TextField source="description" />
      <DateField source="date" />
    </SimpleShowLayout>
  </Show>
);

export default WorkshopShow;
