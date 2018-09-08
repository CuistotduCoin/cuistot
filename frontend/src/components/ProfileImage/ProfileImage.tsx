import Avatar from '@material-ui/core/Avatar';
import { withStyles } from "@material-ui/core/styles";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PersonIcon from "@material-ui/icons/Person";
import React from 'react';
import { Storage } from "shared/auth";

const styles = theme => ({
  avatar: {
    width: '120px',
    height: '120px',
  },
  icon: {
    color: theme.palette.text.secondary,
    height: '100px',
    width: '100px',
  }
});

interface IProfileImageProps {
  classes: any;
  imageKey: string;
  identityId: string;
  showAddImagePlaceholder: boolean;
}

interface IProfileImageState {
  imageSrc?: any;
}

class ProfileImage extends React.Component<
  IProfileImageProps,
  IProfileImageState
> {
  public static defaultProps: Partial<IProfileImageProps> = {
    showAddImagePlaceholder: false,
  };

  constructor(props) {
    super(props);
    this.loadProfileImage = this.loadProfileImage.bind(this);
    this.state = {};
  }

  public componentDidMount() {
    this.loadProfileImage();
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.imageKey !== this.props.imageKey) {
      this.loadProfileImage();
    }
  }

  public loadProfileImage() {
    const { imageKey, identityId } = this.props;
    if (imageKey && identityId) {
      Storage.get(`profile/${imageKey}`, { identityId })
        .then(result => this.setState({ imageSrc: result }))
        .catch(err => console.error(err));
    }
  }

  public render() {
    const { classes, showAddImagePlaceholder } = this.props;

    if (this.state.imageSrc) {
      return <Avatar src={this.state.imageSrc} className={classes.avatar} />;
    }

    if (showAddImagePlaceholder) {
      return <AddAPhotoIcon className={classes.icon} />
    }

    return <PersonIcon className={classes.icon} />;
  }
}

export default withStyles(styles)(ProfileImage);
