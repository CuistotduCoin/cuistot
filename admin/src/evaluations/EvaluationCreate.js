import React from 'react';
import {
  Create,
  SimpleForm,
  LongTextInput,
  NumberInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin';

const EvaluationCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="cook.id" reference="cooks" validate={required()}>
        <AutocompleteInput optionText={choice => `${choice.gourmet.first_name} ${choice.gourmet.last_name}`} />
      </ReferenceInput>
      <NumberInput source="rating" />
      <LongTextInput source="comment" />
    </SimpleForm>
  </Create>
);

export default EvaluationCreate;
