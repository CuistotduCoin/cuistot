import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  LongTextInput,
  required,
  email,
  DateInput,
} from 'react-admin';
import { parse } from 'query-string';
import { validatePhoneNumber } from '../utils';

const CookCreate = (props) => {
  const { gourmet_id: gourmetId } = parse(props.location.search);

  return (
    <Create {...props}>
      <SimpleForm>
        <BooleanInput source="is_pro" />
        <ReferenceInput source="gourmet.id" reference="gourmets" validate={required()} defaultValue={gourmetId}>
          <AutocompleteInput optionText={choice => `${choice.first_name} ${choice.last_name}`} />
        </ReferenceInput>
        <LongTextInput source="description" />
        <TextInput source="business_name" />
        <TextInput source="siren" />
        <TextInput source="pro_email" validate={email()} />
        <TextInput source="pro_phone_number" validate={[required(), validatePhoneNumber]} />
        <TextInput source="legal_first_name" />
        <TextInput source="legal_last_name" />
        <DateInput source="legal_birthdate" />
      </SimpleForm>
    </Create>
  );
};

export default CookCreate;
