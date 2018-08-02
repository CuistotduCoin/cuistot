import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Theme, withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
// @ts-ignore
import React from "react";

const styles = (theme: Theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    extend: 'icon',
    marginRight: theme.spacing.unit,
    opacity: 0.9,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  message: {
    alignItems: 'center',
    display: 'flex',
  },
  success: {
    backgroundColor: green[600],
  },
  warning: {
    backgroundColor: amber[700],
  },
});

enum Variant {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info'
}

interface ISnackbarProps {
  classes: any;
  message: string;
  onClose: any;
  open: boolean;
  hidable: boolean;
  variant: Variant;
}

const variantIcon = {
  error: ErrorIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
};

export class SnackbarWrapper extends React.Component<ISnackbarProps, {}> {
  public static defaultProps: Partial<ISnackbarProps> = {
    hidable: true,
    open: false,
    variant: Variant.info,
  };

  public render() {
    const { classes, open, message, onClose, variant, hidable } = this.props;
    const Icon = variantIcon[variant]; // tslint:disable-line

    let action;
    if (hidable) {
      action = (
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      );
    }

    return (
      <Snackbar
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <SnackbarContent
          className={classes[variant]}
          message={
            <span className={classes.message}>
              <Icon className={classes.iconVariant} />
              {message}
            </span>
          }
          action={action}
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles as any)(SnackbarWrapper as any) as any;
