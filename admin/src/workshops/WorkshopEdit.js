import React from 'react';
import {
  Edit,
  SimpleForm,
  DateInput,
  DisabledInput,
  TextInput,
  NumberInput,
  required,
  ReferenceInput,
  SelectInput,
} from 'react-admin';
import { CookNameField, NameField } from '../fields';

const WorkshopEdit = props => (
  <Edit title={<NameField />} {...props}>
    <SimpleForm>
      <DisabledInput label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <NumberInput source="price" validate={required()} />
      <NumberInput source="duration" validate={required()} />
      <NumberInput source="min_gourmet" validate={required()} />
      <NumberInput source="max_gourmet" validate={required()} />
      <DateInput source="date" validate={required()} />
      <ReferenceInput source="cook.id" reference="cooks" validate={required()}>
        <SelectInput optionText={<CookNameField />} />
      </ReferenceInput>
      <ReferenceInput source="kitchen.id" reference="kitchens" validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default WorkshopEdit;
