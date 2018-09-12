import React from 'react';
import { connect } from 'react-redux';
import { refreshView as refreshViewAction } from 'ra-core';
import { API, graphqlOperation } from 'aws-amplify';
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
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import RestoreIcon from '@material-ui/icons/Restore';
import { GourmetNameField, ImageField } from '../fields';
import { CookIcon } from '../cooks';
import { RecreateGourmet } from '../queries';

const recreateGourmet = (gourmetId, refreshView) => () => {
  API.graphql(
    graphqlOperation(RecreateGourmet, {
      gourmet: { id: gourmetId },
    }),
  ).then((result) => {
    if (result.data.recreateGourmet.message === 'success') {
      refreshView();
    } else {
      console.error('Failure while recreating gourmet');
    }
  });
};

const GourmetShowActions = ({ basePath, data, refreshView }) => {
  let recreateGourmetButton;
  let createCookButton;
  if (data && data.id) {
    if (data.deleted_at) {
      recreateGourmetButton = (
        <Button
          variant="raised"
          label="Restaurer le gourmet"
          title="Restaurer le gourmet"
          onClick={recreateGourmet(data.id, refreshView)}
        >
          <RestoreIcon />
        </Button>
      );
    } else {
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
  }
  return (
    <CardActions>
      {recreateGourmetButton}
      {createCookButton}
      {!recreateGourmetButton && <EditButton basePath={basePath} record={data} />}
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const GourmetShow = ({ refreshView, ...props }) => (
  <Show actions={<GourmetShowActions refreshView={refreshView} />} title={<GourmetNameField />} {...props}>
    <SimpleShowLayout>
      <ImageField path="profile" identityId={record => record.identity_id} />
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

const enhance = compose(
  connect(null, { refreshView: refreshViewAction }),
);

export default enhance(GourmetShow);
