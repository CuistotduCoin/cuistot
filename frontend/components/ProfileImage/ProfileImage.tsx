import Avatar from '@material-ui/core/Avatar';
import { withStyles } from "@material-ui/core/styles";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PersonIcon from "@material-ui/icons/Person";
import cx from 'classnames';
import S3Image from "../../components/S3Image";
import React from 'react';

const styles = theme => ({
  avatar: {
    backgroundColor: 'white',
    border: '5px solid white'
  },
  normal: {
    width: '120px',
    height: '120px'
  },
  small: {
    width: '60px',
    height: '60px'
  },
  icon: {
    backgroundColor: 'white',
    border: '5px solid white',
    borderRadius: '50%',
    color: theme.palette.text.secondary
  }
});

interface IProfileImageProps {
  classes: any;
  size?: "small" | "normal";
  imageKey?: string;
  identityId: string;
  showAddImagePlaceholder?: boolean;
  alt?: string;
}

class ProfileImage extends React.Component<IProfileImageProps> {
  public static defaultProps: Partial<IProfileImageProps> = {
    showAddImagePlaceholder: false,
    size: 'normal',
  };

  public render() {
    const { classes, imageKey, identityId, showAddImagePlaceholder, size, alt } = this.props;

    const image = (
      <S3Image
        component={Avatar}
        path="profile"
        imageKey={imageKey}
        identityId={identityId}
        alt={alt}
        className={cx(classes.avatar, classes[size])}
      />
    );

    if (image) {
      return image;
    }

    if (showAddImagePlaceholder) {
      return <AddAPhotoIcon className={cx(classes.icon, classes[size])} />
    }

    return <PersonIcon className={cx(classes.icon, classes[size])} />;
  }
}

export default withStyles(styles)(ProfileImage);
