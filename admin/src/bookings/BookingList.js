import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import {
  Datagrid,
  List,
  Responsive,
  NumberField,
  ReferenceField,
  TextField,
  ShowButton,
  EditButton,
  Filter,
  BooleanInput,
  downloadCSV,
} from 'react-admin';
import { unparse as convertToCSV } from 'papaparse/papaparse.min'; // eslint-disable-line
import { GourmetNameField } from '../fields';

const exporter = (bookings) => {
  const data = bookings.map((booking) => {
    const { workshop, gourmet, ...rest } = booking; // eslint-disable-line
    const result = { ...rest };
    result.gourmet = `${gourmet.first_name} ${gourmet.last_name}`;
    result.workshop = workshop.name;
    return result;
  });
  const csv = convertToCSV({
    data,
    fields: ['workshop', 'gourmet', 'amount'],
  });
  downloadCSV(csv, 'bookings');
};

const BookingFilter = props => (
  <Filter {...props}>
    <BooleanInput source="has_been_deleted" label="pos.has_been_deleted" />
  </Filter>
);

const BookingList = ({ showDeletedOnes, ...props }) => {
  const listProps = {};
  if (showDeletedOnes) {
    listProps.bulkActions = false;
    listProps.bulkActionButtons = false;
  }

  return (
    <List
      {...props}
      exporter={exporter}
      filters={<BookingFilter />}
      sort={{ field: 'updated_at', order: 'DESC' }}
      {...listProps}
    >
      <Responsive
        medium={(
          <Datagrid>
            <ReferenceField reference="workshops" source="workshop.id" linkType="show" sortable={false}>
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField reference="gourmets" source="gourmet.id" linkType="show" sortable={false}>
              <GourmetNameField />
            </ReferenceField>
            <NumberField source="amount" />
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

export default connect(mapStateToProps)(BookingList);
