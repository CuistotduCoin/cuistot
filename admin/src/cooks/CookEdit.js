import React from 'react';
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { refreshView as refreshViewAction } from 'ra-core';
import {
  Edit,
  SimpleForm,
  DateInput,
  DisabledInput,
  TextInput,
  BooleanInput,
  email,
  ShowButton,
  ListButton,
  RefreshButton,
  CardActions,
  Button,
} from 'react-admin';
import CheckIcon from '@material-ui/icons/Check';
import { CookNameField } from '../fields';
import { ConfirmCook } from '../queries';

const confirmCook = (cookId, refreshView) => () => {
  API.graphql(
    graphqlOperation(ConfirmCook, {
      cook: { id: cookId },
    }),
  ).then((result) => {
    if (result.data.confirmCook.message === 'success') {
      refreshView();
    } else {
      console.error('Failure while confirming cook');
    }
  });
};

const CookEditActions = ({ basePath, data, refreshView }) => {
  let confirmCookButton;
  if (data && data.id && !data.confirmed) {
    confirmCookButton = (
      <Button
        variant="raised"
        label="Confirmer le cuistot"
        title="Confirmer le cuistot"
        onClick={confirmCook(data.id, refreshView)}
      >
        <CheckIcon />
      </Button>
    );
  }
  return (
    <CardActions>
      {confirmCookButton}
      <ShowButton basePath={basePath} record={data} />
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const CookEdit = ({ refreshView, ...props }) => (
  <Edit actions={<CookEditActions refreshView={refreshView} />} title={<CookNameField />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <BooleanInput source="is_pro" />
      <TextInput source="business_name" />
      <TextInput source="siren" />
      <TextInput source="pro_email" validate={email()} />
      <TextInput source="legal_first_name" />
      <TextInput source="legal_last_name" />
      <DateInput source="legal_birthdate" />
    </SimpleForm>
  </Edit>
);

export default connect(null, { refreshView: refreshViewAction })(CookEdit);
