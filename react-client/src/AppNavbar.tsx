import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';

interface State {
  isOpen: boolean;
}

export default class AppNavbar extends React.PureComponent<any, State> {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <Navbar color="success" dark={true} expand="md">
        <NavbarBrand tag={Link} to="/">
          Home
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar={true}>
          <Nav className="ml-auto" navbar={true}>
            <NavItem>
              <NavLink href="https://twitter.com/oktadev">@oktadev</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/oktadeveloper/okta-react-graphql-example/">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
