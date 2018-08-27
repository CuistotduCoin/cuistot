import React from 'react';
import {
  Create,
  SimpleForm,
  NumberInput,
  required,
  ReferenceInput,
  SelectInput,
} from 'react-admin';
import { GourmetNameField } from '../fields';

const WorkshopCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="workshop.id" reference="workshops" validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="gourmet.id" reference="gourmets" validate={required()}>
        <SelectInput optionText={<GourmetNameField />} />
      </ReferenceInput>
      <NumberInput source="amount" />
    </SimpleForm>
  </Create>
);

export default WorkshopCreate;
