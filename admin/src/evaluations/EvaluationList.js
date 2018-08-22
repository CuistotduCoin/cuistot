import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  NumberField,
  LongTextField,
} from 'react-admin';

const EvaluationList = props => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <NumberField source="rating" />
          <LongTextField source="comment" />
        </Datagrid>
      )}
    />
  </List>
);

export default EvaluationList;
