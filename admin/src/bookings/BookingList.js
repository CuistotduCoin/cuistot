import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  NumberField,
} from 'react-admin';

const BookingList = props => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <NumberField source="amount" />
        </Datagrid>
      )}
    />
  </List>
);

export default BookingList;
