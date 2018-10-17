import { bootstrap } from 'vesper';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';

import { PointsController } from './controller/PointsController';
import { Points } from './entity/Points';
import { User } from './entity/User';

const port = 4000;
bootstrap({
  port,
  controllers: [PointsController],
  entities: [Points, User],
  schemas: [__dirname + '/schema/**/*.graphql'],
  customResolvers: {
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
  },
  cors: true,
})
  .then(() => {
    console.log(`Your app is running on http://localhost:${port}`);
  })
  .catch(err => {
    console.log(err);
  });
