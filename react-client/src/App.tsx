import * as React from 'react';
import { Query } from 'react-apollo';

import { pointsQuery } from './graphql/queries';
import { PointsQuery } from './schemaTypes';

class App extends React.PureComponent {
  render() {
    return (
      <Query<PointsQuery> query={pointsQuery}>
        {({ data, loading }) => {
          if (loading || !data || !data.points) {
            return null;
          }
          return data.points.map(p => (
            <div key={p.id}>
              <p>Date: {p.date}</p>
              <p>Points: {p.exercise + p.diet + p.alcohol}</p>
              <p>Notes: {p.notes}</p>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default App;
