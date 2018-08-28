import React from 'react';
import {
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  NumberInput,
  required,
  ReferenceInput,
  SelectInput,
} from 'react-admin';
import { DateTimeInput } from 'react-admin-date-inputs';
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
      <DateTimeInput
        source="date"
        label="resources.workshops.fields.date"
        options={{ format: 'DD/MM/YYYY, HH:mm:ss', ampm: false, clearable: true }}
        validate={required()}
      />
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
