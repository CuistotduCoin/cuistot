import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  DateField,
  BooleanField,
} from 'react-admin';

const CookList = props => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <BooleanField source="is_pro" />
          <TextField source="business_name" />
          <TextField source="siren" />
          <TextField source="pro_email" />
          <TextField source="legal_first_name" />
          <TextField source="legal_last_name" />
          <DateField source="legal_birthdate" />
        </Datagrid>
      )}
    />
  </List>
);

export default CookList;
