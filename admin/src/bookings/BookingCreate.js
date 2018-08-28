import React from 'react';
import {
  Create,
  SimpleForm,
  NumberInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin';

const WorkshopCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="workshop.id" reference="workshops" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="gourmet.id" reference="gourmets" validate={required()}>
        <AutocompleteInput optionText={choice => `${choice.first_name} ${choice.last_name}`} />
      </ReferenceInput>
      <NumberInput source="amount" />
    </SimpleForm>
  </Create>
);

export default WorkshopCreate;
