import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  ShowButton,
  EditButton,
} from 'react-admin';
import { LocationField } from '../fields';

const KitchenList = props => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <TextField source="name" />
          <TextField source="address" />
          <TextField source="city" />
          <TextField source="zip_code" />
          <LocationField />
          <ShowButton />
          <EditButton />
        </Datagrid>
      )}
    />
  </List>
);

export default KitchenList;
