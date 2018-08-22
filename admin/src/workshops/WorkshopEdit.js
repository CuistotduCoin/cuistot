import React from 'react';
import {
  Edit,
  SimpleForm,
  DateInput,
  CardActions,
  ShowButton,
  ListButton,
  DeleteButton,
  RefreshButton,
  DisabledInput,
  TextInput,
  NumberInput,
  required,
} from 'react-admin';

const WorkshopName = ({ record }) => <span>{record.name}</span>;

const PostEditActions = ({ basePath, data, resource }) => (
  <CardActions>
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
    <DeleteButton basePath={basePath} record={data} resource={resource} />
    <RefreshButton />
  </CardActions>
);

const WorkshopEdit = props => (
  <Edit actions={<PostEditActions />} title={<WorkshopName />} {...props}>
    <SimpleForm>
      <DisabledInput label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <NumberInput source="price" validate={required()} />
      <NumberInput source="duration" validate={required()} />
      <NumberInput source="min_gourmet" validate={required()} />
      <NumberInput source="max_gourmet" validate={required()} />
      <DateInput source="date" validate={required()} />
    </SimpleForm>
  </Edit>
);

export default WorkshopEdit;
