import React from 'react';
import {
  Edit,
  SimpleForm,
  NumberInput,
} from 'react-admin';

const BookingEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput source="amount" />
    </SimpleForm>
  </Edit>
);

export default BookingEdit;
