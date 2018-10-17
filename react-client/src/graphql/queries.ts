import { gql } from 'apollo-boost';

export const pointsQuery = gql`
  query PointsQuery {
    points {
      id
      date
      exercise
      diet
      alcohol
      notes
    }
  }
`;
