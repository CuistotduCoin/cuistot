import React from 'react';
import {
  TextField,
  EmailField,
  DateField,
  RichTextField,
  Show,
  SimpleShowLayout,
  CardActions,
  EditButton,
  ListButton,
  RefreshButton,
} from 'react-admin';
import { GourmetNameField } from '../fields';

const GourmetShowActions = ({ basePath, data }) => (
  <CardActions>
    <EditButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);

const GourmetShow = props => (
  <Show actions={<GourmetShowActions />} title={<GourmetNameField />} {...props}>
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
