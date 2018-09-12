import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import {
  Datagrid,
  List,
  Responsive,
  RichTextField,
  ReferenceField,
  ShowButton,
  EditButton,
  Filter,
  BooleanInput,
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

const EvaluationFilter = props => (
  <Filter {...props}>
    <BooleanInput source="has_been_deleted" label="pos.has_been_deleted" />
  </Filter>
);

const EvaluationList = ({ showDeletedOnes, ...props }) => {
  const listProps = {};
  if (showDeletedOnes) {
    listProps.bulkActions = false;
    listProps.bulkActionButtons = false;
  }

  return (
    <List
      {...props}
      exporter={exporter}
      filters={<EvaluationFilter />}
      sort={{ field: 'created_at', order: 'DESC' }}
      {...listProps}
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
            <ShowButton />
            {!showDeletedOnes && <EditButton />}
          </Datagrid>
        )}
      />
    </List>
  );
};

const mapStateToProps = state => ({
  showDeletedOnes: get(state, 'form.filterForm.values.has_been_deleted'),
});

export default connect(mapStateToProps)(EvaluationList);
