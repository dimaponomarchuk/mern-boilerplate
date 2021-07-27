import CRUD from '../common/crud';

import User from './entity';
import UserRepository from './repository';

export default class UserService implements CRUD<User> {
  private static _instance: UserService;

  private readonly _repository: UserRepository;

  constructor() {
    this._repository = UserRepository.getInstance();
  }

  static getInstance() {
    if (!UserService._instance) {
      UserService._instance = new UserService();
    }
    return UserService._instance;
  }

  getByEmail(email: string) {
    return this._repository.findByEmail(email);
  }

  list(limit: number, page: number) {
    return this._repository.find(limit, page);
  }

  patchById(id: string, resource: User) {
    return this._repository.patch(id, resource);
  }

  create(resource: User) {
    const user = resource;
    user.setPermissionLevel(1);

    return this._repository.create(user);
  }

  readById(resourceId: string) {
    return this._repository.findOne(resourceId);
  }

  updateById(id: string, resource: User) {
    return this._repository.update(id, resource);
  }

  deleteById(resourceId: string) {
    return this._repository.delete(resourceId);
  }
}
