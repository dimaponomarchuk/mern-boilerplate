import { BaseRepository } from '../common/repository';

import User from './entity';
import UserSchema from './schema';
import UserSerializer from './serializer';

export default class UserRepository extends BaseRepository<User> {
  private static _instance: UserRepository;

  constructor() {
    super(UserSchema, new UserSerializer());
  }

  static getInstance(): UserRepository {
    if (!UserRepository._instance) {
      UserRepository._instance = new UserRepository();
    }
    return UserRepository._instance;
  }

  async findByEmail(email: string) {
    let user = await this.Collection.findOne({ email }).exec();
    if (user) {
      user = this.Serializer.deserialize(user);
    }
    return user;
  }
}
