import React from 'react';
import {
  Edit,
  SimpleForm,
  NumberInput,
  DisabledInput,
  CardActions,
  ShowButton,
  ListButton,
  RefreshButton,
} from 'react-admin';

const BookingEditActions = ({ basePath, data }) => (
  <CardActions>
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);

const BookingEdit = props => (
  <Edit actions={<BookingEditActions />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <NumberInput source="amount" />
    </SimpleForm>
  </Edit>
);

export default BookingEdit;
