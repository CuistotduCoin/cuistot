import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  ShowButton,
  EditButton,
  Filter,
  TextInput,
  downloadCSV,
} from 'react-admin';
import { unparse as convertToCSV } from 'papaparse/papaparse.min'; // eslint-disable-line
import { LocationField } from '../fields';

const exporter = (kitchens) => {
  const csv = convertToCSV({
    data: kitchens,
    fields: ['name', 'address', 'city', 'zip_code'],
  });
  downloadCSV(csv, 'kitchens');
};

const KitchenFilter = props => (
  <Filter {...props}>
    <TextInput label="pos.search" source="q" alwaysOn />
  </Filter>
);

const KitchenList = props => (
  <List
    {...props}
    exporter={exporter}
    filters={<KitchenFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
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
