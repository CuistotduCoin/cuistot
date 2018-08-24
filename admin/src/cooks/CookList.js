import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  EmailField,
  DateField,
  BooleanField,
  ReferenceField,
  ShowButton,
  EditButton,
} from 'react-admin';
import { GourmetNameField } from '../fields';

const CookList = props => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <ReferenceField reference="gourmets" source="gourmet.id" linkType="show">
            <GourmetNameField />
          </ReferenceField>
          <BooleanField source="is_pro" />
          <TextField source="business_name" />
          <TextField source="siren" />
          <EmailField source="pro_email" />
          <TextField source="legal_first_name" />
          <TextField source="legal_last_name" />
          <DateField source="legal_birthdate" />
          <ShowButton />
          <EditButton />
        </Datagrid>
      )}
    />
  </List>
);

export default CookList;
