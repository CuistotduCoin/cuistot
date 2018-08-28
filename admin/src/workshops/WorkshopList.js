import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  ReferenceField,
  EditButton,
  ShowButton,
  Filter,
  TextInput,
  BooleanInput,
  downloadCSV,
} from 'react-admin';
import { unparse as convertToCSV } from 'papaparse/papaparse.min'; // eslint-disable-line
import WorkshopDate from './WorkshopDate';
import WorkshopPrice from './WorkshopPrice';
import { CookNameField } from '../fields';

const exporter = (workshops) => {
  const data = workshops.map((workshop) => {
    const { cook, kitchen, ...rest } = workshop; // eslint-disable-line
    const result = { ...rest };
    result.kitchen = kitchen.name;
    result.cook = `${cook.gourmet.first_name} ${cook.gourmet.last_name}`;
    return result;
  });
  const csv = convertToCSV({
    data,
    fields: ['name', 'description', 'price', 'min_gourmet', 'max_gourmet', 'kitchen', 'cook'],
  });
  downloadCSV(csv, 'workshops');
};

const WorkshopFilter = props => (
  <Filter {...props}>
    <TextInput label="pos.search" source="q" alwaysOn />
    <BooleanInput source="has_bookings" label="resources.workshops.has_bookings" />
    <BooleanInput source="has_been_archived" label="resources.workshops.has_been_archived" />
  </Filter>
);

const WorkshopList = props => (
  <List
    {...props}
    exporter={exporter}
    filters={<WorkshopFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
    perPage={15}
  >
    <Responsive
      medium={(
        <Datagrid>
          <TextField source="name" />
          <ReferenceField reference="cooks" source="cook.id" linkType="show" sortable={false}>
            <CookNameField />
          </ReferenceField>
          <ReferenceField reference="kitchens" source="kitchen.id" linkType="show" sortable={false}>
            <TextField source="name" />
          </ReferenceField>
          <WorkshopPrice />
          <TextField source="duration" />
          <TextField source="min_gourmet" />
          <TextField source="max_gourmet" />
          <WorkshopDate />
          <ShowButton />
          <EditButton />
        </Datagrid>
      )}
    />
  </List>
);

export default WorkshopList;
