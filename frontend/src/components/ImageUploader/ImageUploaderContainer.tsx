import { AppContainer } from "components/App";
import React from "react";
import { Subscribe } from "unstated";
import ImageUploader from "./ImageUploader";

interface IImageUploaderContainerProps {
  previewSrc?: string;
  multiple?: boolean;
  path: string;
  identityId: string;
}

// tslint:disable-next-line
const ImageUploaderContainer: React.SFC<
  IImageUploaderContainerProps
> = props => (
  <Subscribe to={[AppContainer]}>
    {(app: any) => (
      <ImageUploader
        {...props}
        updateCurrentGourmetImage={app.updateCurrentGourmetImage}
        openSnackbar={app.openSnackbar}
      />
    )}
  </Subscribe>
);

export default ImageUploaderContainer;
