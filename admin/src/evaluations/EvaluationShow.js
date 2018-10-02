import React from 'react';
import { connect } from 'react-redux';
import { refreshView as refreshViewAction } from 'ra-core';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Show,
  ReferenceField,
  RichTextField,
  SimpleShowLayout,
  Button,
  CardActions,
  EditButton,
  ListButton,
  RefreshButton,
} from 'react-admin';
import { compose } from 'recompose';
import RestoreIcon from '@material-ui/icons/Restore';
import { CookNameField, GourmetNameField } from '../fields';
import { RecreateEvaluation } from '../queries';
import StarRatingField from './StarRatingField';

const recreateEvaluation = (evaluationId, refreshView) => () => {
  API.graphql(
    graphqlOperation(RecreateEvaluation, {
      evaluation: { id: evaluationId },
    }),
  ).then((result) => {
    if (result.data.recreateEvaluation.message === 'success') {
      refreshView();
    } else {
      console.error('Failure while recreating evaluation');
    }
  });
};

const EvaluationShowActions = ({ basePath, data, refreshView }) => {
  let recreateEvaluationButton;
  if (data && data.id && data.deleted_at) {
    recreateEvaluationButton = (
      <Button
        variant="raised"
        label="Restaurer l'évaluation"
        title="Restaurer l'évaluation"
        onClick={recreateEvaluation(data.id, refreshView)}
      >
        <RestoreIcon />
      </Button>
    );
  }
  return (
    <CardActions>
      {recreateEvaluationButton}
      {!recreateEvaluationButton && <EditButton basePath={basePath} record={data} />}
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const EvaluationShow = ({ refreshView, ...props }) => (
  <Show actions={<EvaluationShowActions refreshView={refreshView} />} {...props}>
    <SimpleShowLayout>
      <ReferenceField reference="cooks" source="cook.id">
        <CookNameField />
      </ReferenceField>
      <ReferenceField reference="gourmets" source="author.id">
        <GourmetNameField />
      </ReferenceField>
      <StarRatingField />
      <RichTextField source="comment" />
    </SimpleShowLayout>
  </Show>
);

const enhance = compose(
  connect(null, { refreshView: refreshViewAction }),
);

export default enhance(EvaluationShow);
