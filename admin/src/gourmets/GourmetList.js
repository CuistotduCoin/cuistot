import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  TextField,
  DateField,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { LocationField } from '../fields';

const styles = {
  lastCell: {
    paddingRight: '20px !important',
  },
};

const GourmetList = ({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <TextField source="first_name" />
          <TextField source="last_name" />
          <TextField source="email" />
          <TextField source="gender" />
          <DateField source="birthdate" />
          <TextField source="address" />
          <TextField source="city" />
          <TextField source="zip_code" />
          <LocationField
            cellClassName={classes.lastCell}
            headerClassName={classes.lastCell}
          />
        </Datagrid>
      )}
    />
  </List>
);

export default withStyles(styles)(GourmetList);
