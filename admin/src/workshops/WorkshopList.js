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
  // downloadCSV,
} from 'react-admin';
// import { unparse as convertToCSV } from 'papaparse/papaparse.min';
import WorkshopDate from './WorkshopDate';
import WorkshopPrice from './WorkshopPrice';
import { CookNameField } from '../fields';

// const exporter = (workshops) => {
//   const data = workshops.map((workshop) => {
//     const { workshopForExport, cook, kitchen } = workshop; // eslint-disable-line
//     workshopForExport.kitchen_name = workshop.kitchen.name;
//     workshopForExport.cook_name = `${workshop.cook.gourmet.first_name} ${workshop.cook.gourmet.last_name}`;
//     return workshopForExport;
//   });
//   const csv = convertToCSV({
//     data,
//     fields: ['id', 'name', 'description', 'price', 'min_gourmet', 'max_gourmet', 'kitchen_name', 'cook_name'], // order fields in the export
//   });
//   downloadCSV(csv, 'workshops');
// };

const WorkshopFilter = props => (
  <Filter {...props}>
    <TextInput label="pos.search" source="q" alwaysOn />
    <BooleanInput source="has_bookings" label="resources.workshops.has_bookings" />
  </Filter>
);

const WorkshopList = props => (
  <List
    {...props}
    // exporter={exporter}
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
