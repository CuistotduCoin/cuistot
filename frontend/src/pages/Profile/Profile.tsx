import { Theme, withStyles } from "@material-ui/core/styles";
import { PhotoPicker, S3Image } from "aws-amplify-react";
import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import { Link } from "react-router-dom";
import { Storage } from "shared/auth";

const styles = (theme: Theme) => ({});

interface IProfileProps {
  classes?: any;
}

export class Profile extends React.Component<IProfileProps, {}> {
  constructor(props) {
    super(props);
    this.state = { url: null };
  }

  public componentDidMount() {
    Storage.get("portrait_stephane-d0c6b33c.jpg", { identityId: "xxx" })
      .then(result => {
        this.setState({ url: result });
      })
      .catch(err => {
        console.log(err);
      });
  }

  public render() {
    const { classes } = this.props;

    return (
      <>
        <img src={this.state.url} />
        <S3Image level="protected" picker />
      </>
    );
  }
}

export default withStyles(styles as any)(Profile as any) as any;
