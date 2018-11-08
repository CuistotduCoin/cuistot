import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  LongTextInput,
  NumberInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  DateTimeInput,
} from 'react-admin';

const WorkshopCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <LongTextInput source="description" />
      <NumberInput source="price" validate={required()} />
      <NumberInput source="duration" validate={required()} />
      <NumberInput source="min_gourmet" validate={required()} />
      <NumberInput source="max_gourmet" validate={required()} />
      <DateTimeInput source="date" label="resources.workshops.fields.date" validate={required()} />
      <ReferenceInput source="cook.id" reference="cooks" validate={required()}>
        <AutocompleteInput optionText={choice => `${choice.gourmet.first_name} ${choice.gourmet.last_name}`} />
      </ReferenceInput>
      <ReferenceInput source="kitchen.id" reference="kitchens" validate={required()}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default WorkshopCreate;
