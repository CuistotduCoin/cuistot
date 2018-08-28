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
  Filter,
  TextInput,
} from 'react-admin';
import { GourmetNameField } from '../fields';

const CookFilter = props => (
  <Filter {...props}>
    <TextInput label="pos.search" source="q" alwaysOn />
  </Filter>
);

const CookList = props => (
  <List
    {...props}
    filters={<CookFilter />}
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
