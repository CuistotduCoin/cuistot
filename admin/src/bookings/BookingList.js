import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  NumberField,
  ReferenceField,
  TextField,
  EditButton,
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

const BookingList = ({ classes, ...props }) => (
  <List
    {...props}
    exporter={exporter}
    sort={{ field: 'updated_at', order: 'DESC' }}
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
          <EditButton />
        </Datagrid>
      )}
    />
  </List>
);

export default BookingList;
