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
  downloadCSV,
} from 'react-admin';
import moment from 'moment';
import { unparse as convertToCSV } from 'papaparse/papaparse.min'; // eslint-disable-line
import { GourmetNameField } from '../fields';

const exporter = (cooks) => {
  const data = cooks.map((cook) => {
    const { gourmet, ...rest } = cook; // eslint-disable-line
    const result = { ...rest };
    result.gourmet = `${gourmet.first_name} ${gourmet.last_name}`;
    if (result.legal_birthdate) {
      result.legal_birthdate = moment(result.legal_birthdate).format('L');
    }
    return result;
  });
  const csv = convertToCSV({
    data,
    fields: ['gourmet', 'is_pro', 'business_name', 'siren', 'pro_email', 'legal_first_name', 'legal_last_name', 'legal_birthdate'],
  });
  downloadCSV(csv, 'cooks');
};

const CookFilter = props => (
  <Filter {...props}>
    <TextInput label="pos.search" source="q" alwaysOn />
  </Filter>
);

const CookList = props => (
  <List
    {...props}
    exporter={exporter}
    filters={<CookFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <ReferenceField reference="gourmets" source="gourmet.id" linkType="show" sortable={false}>
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
