import React from 'react';
import {
  Edit,
  SimpleForm,
  NumberInput,
  DisabledInput,
} from 'react-admin';

const BookingEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <NumberInput source="amount" />
    </SimpleForm>
  </Edit>
);

export default BookingEdit;
