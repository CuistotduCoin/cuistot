import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { GourmetNameField } from '../fields';

const styles = {
  lastCell: {
    paddingRight: '40px !important',
  },
};

const BookingList = ({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <ReferenceField reference="workshops" source="workshop.id" linkType="show">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField reference="gourmets" source="gourmet.id" linkType="show">
            <GourmetNameField />
          </ReferenceField>
          <NumberField
            source="amount"
            cellClassName={classes.lastCell}
            headerClassName={classes.lastCell}
          />
        </Datagrid>
      )}
    />
  </List>
);

export default withStyles(styles)(BookingList);
