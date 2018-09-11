import React from 'react';
import {
  TextField,
  DateField,
  Show,
  ReferenceField,
  TabbedShowLayout,
  Tab,
} from 'react-admin';
import { CookNameField, NameField } from '../fields';
import WorkshopImages from './WorkshopImages';

const WorkshopShow = props => (
  <Show title={<NameField />} {...props}>
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

export default WorkshopShow;
