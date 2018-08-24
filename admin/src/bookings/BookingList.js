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
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <ReferenceField reference="workshops" source="workshop.id" linkType="show">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField reference="gourmets" source="gourmet.id" linkType="show">
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
