import React from 'react';
import { connect } from 'react-redux';
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
  BooleanInput,
  downloadCSV,
} from 'react-admin';
import get from 'lodash.get';
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
    <BooleanInput source="has_been_deleted" label="pos.has_been_deleted" />
  </Filter>
);

const GourmetList = ({ showDeletedOnes, ...props }) => {
  const listProps = {};
  if (showDeletedOnes) {
    listProps.bulkActions = false;
    listProps.bulkActionButtons = false;
  }

  return (
    <List
      {...props}
      exporter={exporter}
      filters={<GourmetFilter />}
      sort={{ field: 'created_at', order: 'DESC' }}
      {...listProps}
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
            {!showDeletedOnes && <EditButton />}
          </Datagrid>
        )}
      />
    </List>
  );
};

const mapStateToProps = state => ({
  showDeletedOnes: get(state, 'form.filterForm.values.has_been_deleted'),
});

export default connect(mapStateToProps)(GourmetList);
