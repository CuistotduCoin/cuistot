import Router from 'next/router';
import React, { Component } from "react";

// tslint:disable-next-line
const withRedirect = (ComposedComponent) =>
  class RedirectDecorator extends Component {
    public state = {
      push: false,
      redirectUrl: null
    };

    public constructor(props) {
      super(props);
      this.redirectTo = this.redirectTo.bind(this);
    }

    // public componentDidUpdate(prevProps, prevState) {
    //   const { redirectUrl } = this.state;

    //   // If component is rendered on redirect page as well
    //   // (i.e. header or footer) it would cause redirect-loop
    //   // as "<Redirect />" is being rendered every time.
    //   // So we are resetting the state after redirect
    //   if (!prevState.redirectUrl && redirectUrl) {
    //     this.setState({
    //       push: false,
    //       redirectUrl: null
    //     });
    //   }
    // }

    public redirectTo(redirectUrl, push = false) {
      Router.push({
        pathname: redirectUrl,
      });
      // this.setState({
      //   push,
      //   redirectUrl
      // });
    }

    public render() {
      return <ComposedComponent {...this.props} redirectTo={this.redirectTo} />;
    }
  };

export default withRedirect;
