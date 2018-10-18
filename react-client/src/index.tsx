// @ts-ignore
import { Security } from '@okta/okta-react';
import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

// @ts-ignore
const onAuthRequired = ({ history }) => {
  history.push('/login');
};

const baseUrl = 'https://dev-316185.oktapreview.com';

const OktaApp = () => (
  <Router>
    <Security
      issuer={`${baseUrl}/oauth2/default`}
      client_id={process.env.CLIENT_ID}
      redirect_uri={window.location.origin + '/implicit/callback'}
      onAuthRequired={onAuthRequired}
    >
      <Route path="/" exact={true} component={Home} />
      <SecureRoute path="/points" component={Points} />
      <Route path="/login" render={() => <Login baseUrl={`${baseUrl}`} />} />
      <Route path="/implicit/callback" component={ImplicitCallback} />
    </Security>
  </Router>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <OktaApp />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
