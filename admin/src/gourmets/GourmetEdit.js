import React from 'react';
import {
  Edit,
  SimpleForm,
  DateInput,
  DisabledInput,
  TextInput,
  required,
  RadioButtonGroupInput,
  CardActions,
  ShowButton,
  ListButton,
  RefreshButton,
  Button,
} from 'react-admin';
import { Link } from 'react-router-dom';
import { GourmetNameField } from '../fields';
import { validateZipCode } from '../utils';
import { CookIcon } from '../cooks';

const GourmetEditActions = ({ basePath, data }) => {
  let createCookButton;
  if (data && data.id) {
    createCookButton = (
      <Button
        variant="raised"
        component={Link}
        to={`/cooks/create?gourmet_id=${data.id}`}
        label="Créer un cuistot"
        title="Créer un cuistot"
      >
        <CookIcon />
      </Button>
    );
  }
  return (
    <CardActions>
      {createCookButton}
      <ShowButton basePath={basePath} record={data} />
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const GourmetEdit = props => (
  <Edit actions={<GourmetEditActions />} title={<GourmetNameField />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <DisabledInput source="email" />
      <RadioButtonGroupInput
        source="gender"
        choices={[
          { id: 'F', name: 'F' },
          { id: 'M', name: 'M' },
          { id: 'U', name: 'U' },
        ]}
      />
      <TextInput source="first_name" validate={required()} />
      <TextInput source="last_name" validate={required()} />
      <TextInput source="description" />
      <DateInput source="birthdate" />
      <TextInput source="address" />
      <TextInput source="city" />
      <TextInput source="zip_code" validate={validateZipCode} />
    </SimpleForm>
  </Edit>
);

export default GourmetEdit;