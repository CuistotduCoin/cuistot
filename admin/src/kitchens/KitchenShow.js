import React from 'react';
import { connect } from 'react-redux';
import { refreshView as refreshViewAction } from 'ra-core';
import { API, graphqlOperation } from 'aws-amplify';
import {
  TextField,
  Show,
  SimpleShowLayout,
  Button,
  CardActions,
  EditButton,
  ListButton,
  RefreshButton,
} from 'react-admin';
import { compose } from 'recompose';
import RestoreIcon from '@material-ui/icons/Restore';
import { NameField } from '../fields';
import { RecreateKitchen } from '../queries';

const recreateKitchen = (kitchenId, refreshView) => () => {
  API.graphql(
    graphqlOperation(RecreateKitchen, {
      kitchen: { id: kitchenId },
    }),
  ).then((result) => {
    if (result.data.recreateKitchen.message === 'success') {
      refreshView();
    } else {
      console.error('Failure while recreating kitchen');
    }
  });
};

const KitchenShowActions = ({ basePath, data, refreshView }) => {
  let recreateKitchenButton;
  if (data && data.id && data.deleted_at) {
    recreateKitchenButton = (
      <Button
        variant="raised"
        label="Restaurer le lieu"
        title="Restaurer le lieu"
        onClick={recreateKitchen(data.id, refreshView)}
      >
        <RestoreIcon />
      </Button>
    );
  }
  return (
    <CardActions>
      {recreateKitchenButton}
      {!recreateKitchenButton && <EditButton basePath={basePath} record={data} />}
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const KitchenShow = ({ refreshView, ...props }) => (
  <Show actions={<KitchenShowActions refreshView={refreshView} />} title={<NameField />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
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

export default enhance(KitchenShow);
