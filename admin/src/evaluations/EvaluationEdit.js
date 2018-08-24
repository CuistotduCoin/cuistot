import React from 'react';
import {
  Edit,
  SimpleForm,
  NumberInput,
  LongTextInput,
} from 'react-admin';

const EvaluationEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput source="rating" />
      <LongTextInput source="comment" />
    </SimpleForm>
  </Edit>
);

export default EvaluationEdit;
