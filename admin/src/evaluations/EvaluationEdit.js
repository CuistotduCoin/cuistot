import React from 'react';
import {
  Edit,
  SimpleForm,
  NumberInput,
  LongTextInput,
  DisabledInput,
  CardActions,
  ShowButton,
  ListButton,
  RefreshButton,
} from 'react-admin';

const EvaluationEditActions = ({ basePath, data }) => (
  <CardActions>
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);

const EvaluationEdit = props => (
  <Edit actions={<EvaluationEditActions />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <NumberInput source="rating" />
      <LongTextInput source="comment" />
    </SimpleForm>
  </Edit>
);

export default EvaluationEdit;
