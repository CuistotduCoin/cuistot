import React from 'react';
import {
  Create,
  SimpleForm,
  DateInput,
  TextInput,
  LongTextInput,
  NumberInput,
  required,
  ReferenceInput,
  SelectInput,
} from 'react-admin';
import { CookNameField } from '../fields';

const WorkshopCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <LongTextInput source="description" />
      <NumberInput source="price" validate={required()} />
      <NumberInput source="duration" validate={required()} />
      <NumberInput source="min_gourmet" validate={required()} />
      <NumberInput source="max_gourmet" validate={required()} />
      <DateInput source="date" validate={required()} />
      <ReferenceInput source="cook_id" reference="cooks">
        <SelectInput optionText={<CookNameField />} />
      </ReferenceInput>
      <ReferenceInput source="kitchen_id" reference="kitchens">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default WorkshopCreate;
