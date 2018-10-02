/*

import React from "react";
import { TextField } from "formik-material-ui";

interface IPaymentFieldProps {
  handleChange: any;
}
interface IPaymentFieldState {
  focused: boolean;
}

class PaymentField extends React.Component <IPaymentFieldProps,IPaymentFieldState> {
  state = {
    focused: false,
  };

  render() {
    return (
      <TextField {...this.props}
      onFocus={ () => {
        this.setState({ focused: true });
      }}
      onChange={ () => {
        this.props.handleChange
      }}
      />
    );
  }
}

export default PaymentField;*/
