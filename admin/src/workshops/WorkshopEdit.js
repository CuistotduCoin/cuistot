import React from 'react';
import { connect } from 'react-redux';
import { refreshView as refreshViewAction } from 'ra-core';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Edit,
  DisabledInput,
  TextInput,
  NumberInput,
  LongTextInput,
  required,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  ShowButton,
  ListButton,
  RefreshButton,
  CardActions,
  Button,
  DateTimeInput,
} from 'react-admin';
import CheckIcon from '@material-ui/icons/Check';
import { CookNameField, NameField } from '../fields';
import { ConfirmWorkshop } from '../queries';
import { ImageInput } from '../inputs';
import WorkshopImages from './WorkshopImages';

const confirmWorkshop = (workshopId, refreshView) => () => {
  API.graphql(
    graphqlOperation(ConfirmWorkshop, {
      workshop: { id: workshopId },
    }),
  ).then((result) => {
    if (result.data.confirmWorkshop.message === 'success') {
      refreshView();
    } else {
      console.error('Failure while confirming workshop');
    }
  });
};

const WorkshopEditActions = ({ basePath, data, refreshView }) => {
  let confirmWorkshopButton;
  if (data && data.id && !data.confirmed) {
    confirmWorkshopButton = (
      <Button
        variant="raised"
        label="Confirmer l'atelier"
        title="Confirmer l'atelier"
        onClick={confirmWorkshop(data.id, refreshView)}
      >
        <CheckIcon />
      </Button>
    );
  }
  return (
    <CardActions>
      {confirmWorkshopButton}
      <ShowButton basePath={basePath} record={data} />
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const WorkshopEdit = ({ refreshView, ...props }) => (
  <Edit actions={<WorkshopEditActions refreshView={refreshView} />} title={<NameField />} {...props}>
    <SimpleForm>
      <WorkshopImages edit />
      <ImageInput
        path={record => `workshops/${record.id}`}
        identityId={record => record.cook.gourmet.identity_id}
      />
      <DisabledInput label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <LongTextInput source="description" />
      <NumberInput source="price" validate={required()} />
      <NumberInput source="duration" validate={required()} />
      <NumberInput source="min_gourmet" validate={required()} />
      <NumberInput source="max_gourmet" validate={required()} />
      <DateTimeInput source="date" label="resources.workshops.fields.date" validate={required()} />
      <ReferenceInput source="cook.id" reference="cooks" validate={required()}>
        <SelectInput optionText={<CookNameField />} />
      </ReferenceInput>
      <ReferenceInput source="kitchen.id" reference="kitchens" validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default connect(null, { refreshView: refreshViewAction })(WorkshopEdit);
