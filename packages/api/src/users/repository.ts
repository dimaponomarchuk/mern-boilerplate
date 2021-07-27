import { BaseRepository } from '../common/repository';

import User from './entity';
import UserSchema from './schema';

export default class UserRepository extends BaseRepository<User> {
  private static _instance: UserRepository;

  constructor() {
    super(UserSchema);
  }

  static getInstance(): UserRepository {
    if (!UserRepository._instance) {
      UserRepository._instance = new UserRepository();
    }
    return UserRepository._instance;
  }

  findByEmail(email: string) {
    return this._collection.findOne({ email });
  }
}
