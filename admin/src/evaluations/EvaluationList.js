import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  NumberField,
  RichTextField,
  ReferenceField,
  EditButton,
} from 'react-admin';
import { CookNameField, GourmetNameField } from '../fields';

const EvaluationList = props => (
  <List
    {...props}
    sort={{ field: 'last_seen', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <ReferenceField reference="cooks" source="cook.id" linkType="show">
            <CookNameField />
          </ReferenceField>
          <ReferenceField reference="gourmets" source="author.id" linkType="show">
            <GourmetNameField />
          </ReferenceField>
          <NumberField source="rating" />
          <RichTextField source="comment" />
          <EditButton />
        </Datagrid>
      )}
    />
  </List>
);

export default EvaluationList;
