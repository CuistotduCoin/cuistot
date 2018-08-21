import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';

import { translate } from 'react-admin';

const styles = {
  media: {
    height: '20em',
    width: '20em',
    margin: '0 auto',
  },
};

const mediaUrl = 'https://static.cuistotducoin.com/img/logo.svg';

const Welcome = ({ classes, translate: translateProp }) => (
  <Card>
    <CardMedia image={mediaUrl} className={classes.media} />
    <CardContent>
      <Typography variant="headline" component="h2">
        {translateProp('pos.dashboard.welcome.title')}
      </Typography>
      <Typography component="p">
        {translateProp('pos.dashboard.welcome.subtitle')}
      </Typography>
    </CardContent>
    <CardActions style={{ justifyContent: 'flex-end' }}>
      <Button href="http://cuistotducoin.com" target="_blank">
        <HomeIcon style={{ paddingRight: '0.5em' }} />
        {translateProp('pos.dashboard.welcome.cta')}
      </Button>
    </CardActions>
  </Card>
);

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(translate(Welcome));
