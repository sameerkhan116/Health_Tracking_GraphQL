import { withAuth } from '@okta/okta-react';
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import OktaSignInWidget from './OktaSignInWidget';

interface State {
  authenticated: boolean | null;
}

interface Props {
  auth: {
    isAuthenticated: () => boolean;
    redirect: (token: any) => void;
  };
  baseUrl: string;
}

export default withAuth(
  class Login extends React.PureComponent<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication();
    }

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    componentDidUpdate = () => {
      this.checkAuthentication();
    };

    onSuccess = (res: any) => {
      return this.props.auth.redirect({
        sessionToken: res.session.token,
      });
    };

    onError = (err: any) => {
      console.log(err);
    };

    render() {
      if (this.state.authenticated === null) {
        return null;
      }
      return this.state.authenticated ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <OktaSignInWidget
          baseUrl={this.props.baseUrl}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
      );
    }
  },
);
