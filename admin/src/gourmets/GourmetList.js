import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  DateField,
} from 'react-admin';
import { LocationField } from '../fields';

const GourmetList = props => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <TextField source="first_name" />
          <TextField source="last_name" />
          <TextField source="email" />
          <TextField source="gender" />
          <DateField source="birthdate" />
          <TextField source="address" />
          <TextField source="city" />
          <TextField source="zip_code" />
          <LocationField />
        </Datagrid>
      )}
    />
  </List>
);

export default GourmetList;
