import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  NumberField,
  ReferenceField,
  TextField,
  EditButton,
} from 'react-admin';
import { GourmetNameField } from '../fields';

const BookingList = ({ classes, ...props }) => (
  <List
    {...props}
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
