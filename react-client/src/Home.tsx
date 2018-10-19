import { withAuth } from '@okta/okta-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

import AppNavbar from './AppNavbar';

interface IUser {
  given_name: string;
}

interface State {
  authenticated: boolean | any;
  userinfo: IUser | null;
  isOpen: boolean;
}

interface Props {
  isAuthenticated: () => boolean;
  getUser: () => IUser;
  auth: {
    login: (path: string) => void;
    logout: (path: string) => void;
  };
}

export default withAuth(
  class Home extends React.PureComponent<Props, State> {
    state = {
      authenticated: null,
      userinfo: ({} as IUser) || null,
      isOpen: false,
    };

    checkAuthentication = async () => {
      const authenticated = await this.props.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        if (authenticated && !this.state.userinfo) {
          const userinfo = await this.props.getUser();
          this.setState({
            authenticated,
            userinfo,
          });
        } else {
          this.setState({ authenticated });
        }
      }
    };

    componentDidMount = async () => {
      this.checkAuthentication();
    };

    componentDidUpdate = async () => {
      this.checkAuthentication();
    };

    login = async () => {
      this.props.auth.login('/');
    };

    logout = async () => {
      this.props.auth.logout('/');
      this.setState({
        authenticated: null,
        userinfo: null,
      });
    };

    render() {
      const { authenticated, userinfo } = this.state;
      if (authenticated === null) {
        return null;
      }
      const button = authenticated ? (
        <div>
          <Button color="link">
            <Link to="/points">Manage Points</Link>
          </Button>
          <Button color="link" onClick={this.logout}>
            Logout
          </Button>
        </div>
      ) : (
        <Button color="primary" onClick={this.login}>
          Login
        </Button>
      );

      const message = userinfo ? (
        <p>Hello, {userinfo.given_name}!</p>
      ) : (
        <p>Please log in to manage your points.</p>
      );

      return (
        <div>
          <AppNavbar />
          <Container fluid={true}>
            {message}
            {button}
          </Container>
        </div>
      );
    }
  },
);
