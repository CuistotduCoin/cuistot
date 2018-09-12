import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Icon from "@material-ui/icons/Person";
import { AppContainer } from "components/App";
import { withRedirect } from "decorators/RedirectDecorator";
import React from "react";
import { compose } from 'recompose';
import { Subscribe } from "unstated";

interface IAccountDropdownProps {
  redirectTo(url: string, push?: boolean);
}

interface IAccountDropdownState {
  open: boolean;
}

class AccountDropdown extends React.Component<IAccountDropdownProps, IAccountDropdownState> {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goToAccount = this.goToAccount.bind(this);
  }

  public handleToggle() {
    this.setState(state => ({ open: !state.open }));
  }

  public handleClose(event) {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  }

  public goToAccount(event) {
    this.handleClose(event);
    this.props.redirectTo("/account");
  }

  public render() {
    const { open } = this.state;

    return (
      <div>
        <Button
          buttonRef={node => (this.anchorEl = node)}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <Icon />
        </Button>
        <Subscribe to={[AppContainer]}>
          {(app: any) => (
            <Popper
              open={open}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              placement="bottom-end"
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps} id="menu-list-grow">
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <MenuItem onClick={this.goToAccount}>
                          Mon compte
                        </MenuItem>
                        <MenuItem onClick={app.logOut}>Se déconnecter</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          )}
        </Subscribe>
      </div>
    );
  }
}

const enhance = compose(
  withRedirect,
);

export default enhance(AccountDropdown);