import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
} from 'react-admin';
import WorkshopDate from './WorkshopDate';
import WorkshopPrice from './WorkshopPrice';

const WorkshopList = ({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
    perPage={15}
  >
    <Responsive
      medium={(
        <Datagrid>
          <TextField source="name" />
          <WorkshopPrice />
          <TextField source="duration" />
          <TextField source="min_gourmet" />
          <TextField source="max_gourmet" />
          <TextField source="description" />
          <WorkshopDate />
        </Datagrid>
      )}
    />
  </List>
);

export default WorkshopList;
