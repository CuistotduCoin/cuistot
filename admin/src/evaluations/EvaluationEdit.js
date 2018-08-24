import React from 'react';
import {
  Edit,
  SimpleForm,
  NumberInput,
  LongTextInput,
  DisabledInput,
} from 'react-admin';

const EvaluationEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <NumberInput source="rating" />
      <LongTextInput source="comment" />
    </SimpleForm>
  </Edit>
);

export default EvaluationEdit;
