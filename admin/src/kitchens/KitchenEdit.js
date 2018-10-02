import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  DisabledInput,
  required,
  CardActions,
  ShowButton,
  ListButton,
  RefreshButton,
} from 'react-admin';
import { NameField } from '../fields';
import { validateZipCode } from '../utils';

const KitchenEditActions = ({ basePath, data }) => (
  <CardActions>
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);

const KitchenEdit = props => (
  <Edit actions={<KitchenEditActions />} title={<NameField />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="address" validate={required()} />
      <TextInput source="city" validate={required()} />
      <TextInput source="zip_code" validate={[required(), validateZipCode]} />
    </SimpleForm>
  </Edit>
);

export default KitchenEdit;
