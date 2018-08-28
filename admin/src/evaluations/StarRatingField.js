import React from 'react';
import Icon from '@material-ui/icons/Stars';

const style = { opacity: 0.87, width: 20, height: 20 };

const StarRatingField = ({ record }) => (
  <span>
    {Array(record.rating)
      .fill(true)
      .map((_, i) => <Icon key={`${record.id}_${i}`} keystyle={style} />)
    }
  </span>
);

StarRatingField.defaultProps = {
  label: 'resources.evaluations.fields.rating',
};

export default StarRatingField;
