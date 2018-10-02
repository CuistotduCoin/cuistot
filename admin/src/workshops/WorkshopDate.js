import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import moment from 'moment';

const WorkshopDate = ({ record }) => (
  <div>{moment(record.date).fromNow()}</div>
);

WorkshopDate.propTypes = {
  record: PropTypes.object,
};

const PureWorkshopDate = pure(WorkshopDate);

PureWorkshopDate.defaultProps = {
  source: 'date',
  label: 'resources.workshops.fields.date',
};

export default PureWorkshopDate;
