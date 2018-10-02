import React from 'react';
import { connect } from 'react-redux';
import { refreshView as refreshViewAction } from 'ra-core';
import { API, graphqlOperation } from 'aws-amplify';
import {
  TextField,
  Show,
  ReferenceField,
  NumberField,
  SimpleShowLayout,
  Button,
  CardActions,
  EditButton,
  ListButton,
  RefreshButton,
} from 'react-admin';
import { compose } from 'recompose';
import RestoreIcon from '@material-ui/icons/Restore';
import { GourmetNameField } from '../fields';
import { RecreateBooking } from '../queries';

const recreateBooking = (bookingId, refreshView) => () => {
  API.graphql(
    graphqlOperation(RecreateBooking, {
      booking: { id: bookingId },
    }),
  ).then((result) => {
    if (result.data.recreateBooking.message === 'success') {
      refreshView();
    } else {
      console.error('Failure while recreating booking');
    }
  });
};

const BookingShowActions = ({ basePath, data, refreshView }) => {
  let recreateBookingButton;
  if (data && data.id && data.deleted_at) {
    recreateBookingButton = (
      <Button
        variant="raised"
        label="Restaurer la réservation"
        title="Restaurer la réservation"
        onClick={recreateBooking(data.id, refreshView)}
      >
        <RestoreIcon />
      </Button>
    );
  }
  return (
    <CardActions>
      {recreateBookingButton}
      {!recreateBookingButton && <EditButton basePath={basePath} record={data} />}
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const BookingShow = ({ refreshView, ...props }) => (
  <Show actions={<BookingShowActions refreshView={refreshView} />} {...props}>
    <SimpleShowLayout>
      <ReferenceField reference="workshops" source="workshop.id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="gourmets" source="gourmet.id">
        <GourmetNameField />
      </ReferenceField>
      <NumberField source="amount" />
    </SimpleShowLayout>
  </Show>
);

const enhance = compose(
  connect(null, { refreshView: refreshViewAction }),
);

export default enhance(BookingShow);
