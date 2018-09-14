import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Chip from '@material-ui/core/Chip';
import { translate } from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { Storage } from '../auth';

const styles = theme => ({
  gridList: {
    padding: theme.spacing.unit * 2,
  },
  chip: {
    margin: theme.spacing.unit * 2,
  },
  icon: {
    color: 'white',
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
  tile: {
    textAlign: 'center',
  },
});

class WorkshopImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { urls: {} };
  }

  componentDidMount() {
    const { record } = this.props;
    if (record.images.length) {
      const keys = record.images.map(image => image.key);
      const promises = keys.map(key => (
        Storage.get(`workshops/${record.id}/${key}`, { identityId: record.cook.gourmet.identity_id })
      ));
      Promise.all(promises)
        .then((values) => {
          const urls = values.reduce((acc, value, i) => {
            acc[value] = record.images[i].key;
            return acc;
          }, {});
          this.setState({ urls });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const {
      classes,
      translate: translateProps,
      record,
      edit,
    } = this.props;

    const urls = Object.keys(this.state.urls);

    if (urls.length) {
      return (
        <GridList
          cellHeight={180}
          cols={3}
          className={classes.gridList}
        >
          {urls.map((url, i) => {
            let image = <img src={url} alt={`${i + 1} for ${record.name}`} />;
            if (!edit) {
              image = <a href={url} target="_blank" rel="noopener noreferrer">{image}</a>;
            }

            return (
              <GridListTile key={url} className={classes.tile}>
                {image}
                {edit && (
                  <GridListTileBar
                    actionIcon={(
                      <IconButton className={classes.icon}>
                        <DeleteIcon
                          onClick={() => {
                            Storage.remove(`workshops/${record.id}/${this.state.urls[url]}`, { identityId: record.cook.gourmet.identity_id })
                              .then(() => {
                                this.setState((prevState) => {
                                  const newState = Object.assign({}, prevState);
                                  delete newState.urls[url];
                                  return newState;
                                });
                              })
                              .catch(err => console.error(err));
                          }}
                        />
                      </IconButton>
                    )}
                  />
                )}
              </GridListTile>
            );
          })}
        </GridList>
      );
    }
    return (
      <Chip
        label={translateProps('resources.workshops.no_picture')}
        className={classes.chip}
      />
    );
  }
}

WorkshopImages.propTypes = {
  translate: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};

WorkshopImages.defaultProps = {
  edit: false,
};

export default withStyles(styles)(translate(WorkshopImages));
