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
  downloadCSV,
} from 'react-admin';
import { unparse as convertToCSV } from 'papaparse/papaparse.min'; // eslint-disable-line

const exporter = (gourmets) => {
  const csv = convertToCSV({
    data: gourmets,
    fields: ['first_name', 'last_name', 'email', 'gender', 'birthdate', 'address', 'city', 'zip_code'],
  });
  downloadCSV(csv, 'gourmets');
};

const GourmetFilter = props => (
  <Filter {...props}>
    <TextInput label="pos.search" source="q" alwaysOn />
  </Filter>
);

const GourmetList = props => (
  <List
    {...props}
    exporter={exporter}
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
          <ShowButton />
          <EditButton />
        </Datagrid>
      )}
    />
  </List>
);

export default GourmetList;
