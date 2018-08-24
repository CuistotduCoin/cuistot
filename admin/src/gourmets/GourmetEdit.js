import React from 'react';
import {
  Edit,
  SimpleForm,
  DateInput,
  DisabledInput,
  TextInput,
  required,
  RadioButtonGroupInput,
} from 'react-admin';
import { GourmetNameField } from '../fields';

const WorkshopEdit = props => (
  <Edit title={<GourmetNameField />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <DisabledInput source="email" />
      <RadioButtonGroupInput
        source="gender"
        choices={[
          { id: 'F', name: 'F' },
          { id: 'M', name: 'M' },
          { id: 'U', name: 'U' },
        ]}
      />
      <TextInput source="first_name" validate={required()} />
      <TextInput source="last_name" validate={required()} />
      <TextInput source="description" />
      <DateInput source="birthdate" />
      <TextInput source="address" />
      <TextInput source="city" />
      <TextInput source="zip_code" />
    </SimpleForm>
  </Edit>
);

export default WorkshopEdit;
