import React from 'react';
import {
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  NumberInput,
  LongTextInput,
  required,
  ReferenceInput,
  SelectInput,
  TabbedShowLayout,
  ShowButton,
  ListButton,
  RefreshButton,
  CardActions,
  Tab,
} from 'react-admin';
import { DateTimeInput } from 'react-admin-date-inputs';
import { CookNameField, NameField } from '../fields';
import { ImageInput } from '../inputs';
import WorkshopImages from './WorkshopImages';

const WorkshopEditActions = ({ basePath, data }) => (
  <CardActions>
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
    <RefreshButton />
  </CardActions>
);

const WorkshopEdit = props => (
  <Edit actions={<WorkshopEditActions />} title={<NameField />} {...props}>
    <TabbedShowLayout>
      <Tab label="pos.info">
        <SimpleForm>
          <DisabledInput label="Id" source="id" />
          <TextInput source="name" validate={required()} />
          <LongTextInput source="description" />
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
      </Tab>
      <Tab label="pos.images">
        <ImageInput
          path={record => `workshops/${record.id}`}
          identityId={record => record.cook.gourmet.identity_id}
        />
        <WorkshopImages edit />
      </Tab>
    </TabbedShowLayout>
  </Edit>
);

export default WorkshopEdit;
