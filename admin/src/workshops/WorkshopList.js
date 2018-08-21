import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextInput,
} from 'react-admin';

const WorkshopList = ({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
    perPage={10}
  >
    <Responsive
      medium={(
        <Datagrid>
          <TextInput source="name" />
        </Datagrid>
      )}
    />
  </List>
);

export default WorkshopList;
