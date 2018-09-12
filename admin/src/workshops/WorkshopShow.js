import React from 'react';
import { connect } from 'react-redux';
import { refreshView as refreshViewAction } from 'ra-core';
import { API, graphqlOperation } from 'aws-amplify';
import {
  TextField,
  DateField,
  Show,
  ReferenceField,
  TabbedShowLayout,
  Tab,
  Button,
  CardActions,
  EditButton,
  ListButton,
  RefreshButton,
} from 'react-admin';
import { compose } from 'recompose';
import RestoreIcon from '@material-ui/icons/Restore';
import { CookNameField, NameField } from '../fields';
import WorkshopImages from './WorkshopImages';
import { RecreateWorkshop } from '../queries';

const recreateWorkshop = (workshopId, refreshView) => () => {
  API.graphql(
    graphqlOperation(RecreateWorkshop, {
      workshop: { id: workshopId },
    }),
  ).then((result) => {
    if (result.data.recreateWorkshop.message === 'success') {
      refreshView();
    } else {
      console.error('Failure while recreating workshop');
    }
  });
};

const WorkshopShowActions = ({ basePath, data, refreshView }) => {
  let recreateWorkshopButton;
  if (data && data.id && data.deleted_at) {
    recreateWorkshopButton = (
      <Button
        variant="raised"
        label="Restaurer l'atelier"
        title="Restaurer l'atelier"
        onClick={recreateWorkshop(data.id, refreshView)}
      >
        <RestoreIcon />
      </Button>
    );
  }
  return (
    <CardActions>
      {recreateWorkshopButton}
      {!recreateWorkshopButton && <EditButton basePath={basePath} record={data} />}
      <ListButton basePath={basePath} />
      <RefreshButton />
    </CardActions>
  );
};

const WorkshopShow = ({ refreshView, ...props }) => (
  <Show actions={<WorkshopShowActions refreshView={refreshView} />} title={<NameField />} {...props}>
    <TabbedShowLayout>
      <Tab label="pos.info">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="price" />
        <TextField source="duration" />
        <TextField source="min_gourmet" />
        <TextField source="max_gourmet" />
        <DateField source="date" showTime />
        <ReferenceField reference="cooks" source="cook.id" linkType="show">
          <CookNameField />
        </ReferenceField>
        <ReferenceField reference="kitchens" source="kitchen.id" linkType="show">
          <TextField source="name" />
        </ReferenceField>
      </Tab>
      <Tab label="pos.images" path="images">
        <WorkshopImages />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

const enhance = compose(
  connect(null, { refreshView: refreshViewAction }),
);

export default enhance(WorkshopShow);
