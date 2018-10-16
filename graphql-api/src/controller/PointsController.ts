import { Controller, Query, Mutation } from 'vesper';
import { EntityManager } from 'typeorm';
import { Points } from '../entity/Points';
import { User } from '../entity/User';

@Controller()
export class PointsController {
  constructor(private entityManager: EntityManager) {}

  @Query()
  points() {
    return this.entityManager.find(Points);
  }

  @Query()
  pointsGet({ id }) {
    return this.entityManager.findOne(Points, id);
  }

  @Query()
  users() {
    return this.entityManager.find(User);
  }

  @Mutation()
  pointsSave(args) {
    const points = this.entityManager.create(Points, args);
    return this.entityManager.save(Points, points);
  }

  @Mutation()
  async pointsDelete({ id }) {
    try {
      await this.entityManager.delete(Points, { id });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
