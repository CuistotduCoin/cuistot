import React from 'react';

const CookNameField = ({ record }) => (
  <div>{record.gourmet.first_name} {record.gourmet.last_name}</div>
);

export default CookNameField;
