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
  Button,
} from 'react-admin';
import { Link } from 'react-router-dom';
import { GourmetNameField, ProfileImageField } from '../fields';
import { CookIcon } from '../cooks';

const GourmetShowActions = ({ basePath, data }) => {
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
      <EditButton basePath={basePath} record={data} />
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const GourmetShow = props => (
  <Show actions={<GourmetShowActions />} title={<GourmetNameField />} {...props}>
    <SimpleShowLayout>
      <ProfileImageField />
      <TextField source="id" />
      <TextField source="identity_id" />
      <EmailField source="email" />
      <TextField source="phone_number" />
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
