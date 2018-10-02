import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

const LocationField = ({ record }) => {
  const data = record.location;
  const x = data.substring(data.indexOf('=') + 1, data.indexOf(','));
  const y = data.substring(data.lastIndexOf('=') + 1, data.indexOf('}'));
  return <div>({x},{y})</div>;
};

LocationField.propTypes = {
  record: PropTypes.object,
};

const PureLocationField = pure(LocationField);

PureLocationField.defaultProps = {
  source: 'location',
  sortable: false,
  label: 'resources.fields.location',
};

export default PureLocationField;
