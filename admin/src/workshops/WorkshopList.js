import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  ReferenceField,
  EditButton,
  ShowButton,
} from 'react-admin';
import WorkshopDate from './WorkshopDate';
import WorkshopPrice from './WorkshopPrice';
import { CookNameField } from '../fields';

const WorkshopList = props => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
    perPage={15}
  >
    <Responsive
      medium={(
        <Datagrid>
          <TextField source="name" />
          <ReferenceField reference="cooks" source="cook.id" linkType="show">
            <CookNameField />
          </ReferenceField>
          <ReferenceField reference="kitchens" source="kitchen.id" linkType="show">
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
