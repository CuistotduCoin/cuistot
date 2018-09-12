import React from 'react';
import { connect } from 'react-redux';
import { refreshView as refreshViewAction } from 'ra-core';
import { API, graphqlOperation } from 'aws-amplify';
import {
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
  ReferenceField,
  BooleanField,
  EmailField,
  RichTextField,
  Button,
  CardActions,
  EditButton,
  ListButton,
  RefreshButton,
} from 'react-admin';
import { compose } from 'recompose';
import RestoreIcon from '@material-ui/icons/Restore';
import { CookNameField, GourmetNameField, ImageField } from '../fields';
import { RecreateCook } from '../queries';

const recreateCook = (cookId, refreshView) => () => {
  API.graphql(
    graphqlOperation(RecreateCook, {
      cook: { id: cookId },
    }),
  ).then((result) => {
    if (result.data.recreateCook.message === 'success') {
      refreshView();
    } else {
      console.error('Failure while recreating cook');
    }
  });
};

const CookShowActions = ({ basePath, data, refreshView }) => {
  let recreateCookButton;
  if (data && data.id && data.deleted_at) {
    recreateCookButton = (
      <Button
        variant="raised"
        label="Restaurer le cuistot"
        title="Restaurer le cuistot"
        onClick={recreateCook(data.id, refreshView)}
      >
        <RestoreIcon />
      </Button>
    );
  }
  return (
    <CardActions>
      {recreateCookButton}
      {!recreateCookButton && <EditButton basePath={basePath} record={data} />}
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const CookShow = ({ refreshView, ...props }) => (
  <Show actions={<CookShowActions refreshView={refreshView} />} title={<CookNameField />} {...props}>
    <SimpleShowLayout>
      <ImageField path="cook" identityId={record => record.gourmet.identity_id} />
      <TextField source="id" />
      <BooleanField source="confirmed" />
      <BooleanField source="is_pro" />
      <ReferenceField reference="gourmets" source="gourmet.id" linkType="show">
        <GourmetNameField />
      </ReferenceField>
      <RichTextField source="description" />
      <TextField source="business_name" />
      <TextField source="siren" />
      <EmailField source="pro_email" />
      <TextField source="pro_phone_number" />
      <TextField source="legal_first_name" />
      <TextField source="legal_last_name" />
      <DateField source="legal_birthdate" />
    </SimpleShowLayout>
  </Show>
);

const enhance = compose(
  connect(null, { refreshView: refreshViewAction }),
);

export default enhance(CookShow);
