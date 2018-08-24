import React from 'react';
import {
  Create,
  SimpleForm,
  LongTextInput,
  NumberInput,
  required,
  ReferenceInput,
  SelectInput,
} from 'react-admin';
import { CookNameField } from '../fields';

const EvaluationCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="cook.id" reference="cooks" validate={required()}>
        <SelectInput optionText={<CookNameField />} />
      </ReferenceInput>
      <NumberInput source="rating" />
      <LongTextInput source="comment" />
    </SimpleForm>
  </Create>
);

export default EvaluationCreate;
