import React from 'react';
import {
  Datagrid,
  List,
  Responsive,
  RichTextField,
  ReferenceField,
  EditButton,
  downloadCSV,
} from 'react-admin';
import { CookNameField, GourmetNameField } from '../fields';
import { unparse as convertToCSV } from 'papaparse/papaparse.min'; // eslint-disable-line
import StarRatingField from './StarRatingField';

const exporter = (evaluations) => {
  const data = evaluations.map((evaluation) => {
    const { cook, author, ...rest } = evaluation; // eslint-disable-line
    const result = { ...rest };
    result.author = `${author.first_name} ${author.last_name}`;
    result.cook = `${cook.gourmet.first_name} ${cook.gourmet.last_name}`;
    return result;
  });
  const csv = convertToCSV({
    data,
    fields: ['author', 'cook', 'rating', 'comment'],
  });
  downloadCSV(csv, 'evaluations');
};

const EvaluationList = props => (
  <List
    {...props}
    exporter={exporter}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Responsive
      medium={(
        <Datagrid>
          <ReferenceField reference="cooks" source="cook.id" linkType="show" sortable={false}>
            <CookNameField />
          </ReferenceField>
          <ReferenceField reference="gourmets" source="author.id" linkType="show" sortable={false}>
            <GourmetNameField />
          </ReferenceField>
          <StarRatingField />
          <RichTextField source="comment" />
          <EditButton />
        </Datagrid>
      )}
    />
  </List>
);

export default EvaluationList;
