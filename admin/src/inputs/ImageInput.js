import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { refreshView as refreshViewAction } from 'ra-core';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import cx from 'classnames';
import { Storage } from '../auth';

const styles = {
  success: {
    color: 'green',
  },
  failure: {
    color: 'red',
  },
  message: {
    marginTop: '10px',
  },
  input: {
    marginTop: '20px',
  },
};

const sanitizeFilename = (filename) => {
  const chunks = filename.replace(' ', '_').split('.');
  const ext = chunks.pop();
  return `${chunks.join('.')}_${Date.now()}.${ext}`;
};

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { message: null, success: false };
  }

  onChange(event) {
    const { record, path, refreshView } = this.props;

    const file = event.target.files[0];
    if (file) {
      const identityId = this.props.identityId(record);
      if (identityId) {
        Storage.put(`${path(record)}/${sanitizeFilename(file.name)}`, file, { identityId })
          .then(() => {
            this.setState({ message: 'Image uploaded... auto refresh in a few seconds', success: true });
            setTimeout(refreshView, 5000); // force the refresh in order to get the new image
          })
          .catch((err) => {
            console.error(err);
            this.setState({ message: 'Image upload has failed', success: false });
          });
      } else {
        this.setState({ message: 'Identity id is missing', success: false });
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={this.onChange}
          className={classes.input}
        />
        <div
          className={cx(
            {
              [classes.success]: this.state.success,
              [classes.failure]: !this.state.success,
            },
            classes.message,
          )}
        >
          {this.state.message}
        </div>
      </div>
    );
  }
}

ImageInput.propTypes = {
  path: PropTypes.func.isRequired,
  identityId: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  refreshView: PropTypes.func.isRequired,
};

const enhance = compose(
  connect(null, { refreshView: refreshViewAction }),
  withStyles(styles),
);

export default enhance(ImageInput);
