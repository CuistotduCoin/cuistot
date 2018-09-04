import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { translate } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { Storage } from '../auth';

const styles = {
  image: {
    margin: '40px 0',
  },
};

class ProfileImageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: null };
  }

  componentDidMount() {
    const { record } = this.props;
    if (record.image && record.image.key) {
      Storage.get(`profile/${record.image.key}`, { identityId: record.identity_id })
        .then(result => this.setState({ imageUrl: result }))
        .catch(err => console.log(err));
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
        label={translateProps('resources.gourmets.no_picture')}
        className={classes.image}
      />
    );
  }
}

ProfileImageField.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(translate(ProfileImageField));
