import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { translate } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { Storage } from '../auth';

const styles = {
  image: {
    margin: '40px 0',
    maxHeight: '500px',
    maxWidth: '500px',
  },
};

class ImageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: null };
  }

  componentDidMount() {
    const { record, path, identityId } = this.props;
    if (record.image && record.image.key) {
      Storage.get(`${path}/${record.image.key}`, { identityId: identityId(record) })
        .then(result => this.setState({ imageUrl: result }))
        .catch(err => console.error(err));
    }
  }

  render() {
    const { classes, translate: translateProps } = this.props;
    if (this.state.imageUrl) {
      return (
        <img
          src={this.state.imageUrl}
          alt="avatar"
          className={classes.image}
        />
      );
    }
    return (
      <Chip
        label={translateProps('pos.no_picture')}
        className={classes.image}
      />
    );
  }
}

ImageField.propTypes = {
  translate: PropTypes.func.isRequired,
  identityId: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default withStyles(styles)(translate(ImageField));
