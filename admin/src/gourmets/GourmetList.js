import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  EmailField,
  DateField,
  ShowButton,
  EditButton,
  Filter,
  TextInput,
} from 'react-admin';
import { LocationField } from '../fields';

const GourmetFilter = props => (
  <Filter {...props}>
    <TextInput label="pos.search" source="q" alwaysOn />
  </Filter>
);

const GourmetList = props => (
  <List
    {...props}
    filters={<GourmetFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <TextField source="first_name" />
          <TextField source="last_name" />
          <EmailField source="email" />
          <TextField source="gender" />
          <DateField source="birthdate" />
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

export default GourmetList;
