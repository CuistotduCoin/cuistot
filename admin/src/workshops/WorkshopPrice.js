import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';

const WorkshopPrice = ({ record }) => (
  <div>{record.price} €</div>
);

WorkshopPrice.propTypes = {
  record: PropTypes.object,
};

const PureWorkshopPrice = pure(WorkshopPrice);

PureWorkshopPrice.defaultProps = {
  source: 'price',
  label: 'resources.workshops.fields.price',
};

export default PureWorkshopPrice;
