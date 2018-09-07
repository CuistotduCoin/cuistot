import { withStyles } from "@material-ui/core/styles";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import React from "react";
import Dropzone from "react-dropzone";
import { Storage } from "shared/auth";

const styles = theme => ({
  container: {
    margin: "0 auto",
    height: "130px",
    width: "130px",
    borderWidth: "1px",
    borderStyle: "dashed",
    borderRadius: "3px",
    borderColor: theme.palette.text.secondary,
    "&:hover": {
      cursor: "pointer"
    }
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  icon: {
    color: theme.palette.text.secondary
  }
});

interface IImageUploaderProps {
  classes: any;
  previewSrc?: string;
  multiple?: boolean;
  path: string;
  identityId: string;
  updateCurrentGourmetImage();
  openSnackbar(message: string, variant: string);
}

interface IImageUploaderState {
  previewSrc?: any;
}

const sanitizeFilename = filename => {
  const chunks = filename.replace(" ", "_").split(".");
  const ext = chunks.pop();
  return `${chunks.join(".")}_${Date.now()}.${ext}`;
};

export class ImageUploader extends React.Component<
  IImageUploaderProps,
  IImageUploaderState
> {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = { previewSrc: props.previewSrc };
  }

  public componentDidUpdate(prevProps) {
    const { previewSrc } = this.props;
    if (prevProps.previewSrc !== previewSrc) {
      this.setState({ previewSrc });
    }
  }

  public onDrop(acceptedFiles, rejectedFiles) {
    const {
      multiple,
      identityId,
      path,
      updateCurrentGourmetImage,
      openSnackbar
    } = this.props;

    if (this.props.multiple) {
      console.log("multiple files enabled");
    } else {
      const file = acceptedFiles[0];
      Storage.put(`${path}/${sanitizeFilename(file.name)}`, file, {
        identityId
      })
        .then(result => {
          console.log(result);
          openSnackbar(
            "Votre photo de profil a bien été changée. Elle devrait apparaître d'ici quelques secondes.",
            "success"
          );
          setTimeout(updateCurrentGourmetImage, 10000);
        })
        .catch(err => {
          console.log(err);
          openSnackbar(
            "Échec de la mise à jour de votre photo de profil",
            "error"
          );
        });
    }
  }

  public render() {
    const { classes } = this.props;
    return (
      <Dropzone
        accept="image/jpeg,image/png"
        onDrop={this.onDrop}
        className={classes.container}
      >
        <div className={classes.content}>
          {this.state.previewSrc ? (
            <img src={this.state.previewSrc} />
          ) : (
            <AddAPhotoIcon className={classes.icon} />
          )}
        </div>
      </Dropzone>
    );
  }
}

export default withStyles(styles as any)(ImageUploader as any) as any;
