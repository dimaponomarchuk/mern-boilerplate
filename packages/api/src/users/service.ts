import CRUD from '../common/crud';

import User from './entity';
import UserRepository from './repository';
import { UserRequestBody } from './types';
import resize from '../common/imageResize';

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

  async patchById(id: string, resource: UserRequestBody) {
    const imageFile = resource.files?.find((file) => file.fieldname === 'avatar');
    let newUrl;
    if (imageFile) {
      newUrl = await resize(imageFile);
    }

    return this._repository.patch(id, {
      ...resource,
      avatarURL: newUrl,
    });
  }

  async create(resource: UserRequestBody) {
    const user = User.create({
      email: resource.email,
      username: resource.username,
      password: resource.password,
    });
    const imageFile = resource.files?.find((file) => file.fieldname === 'avatar');

    if (imageFile) {
      const newUrl = await resize(imageFile);
      user.setAvatarURL(newUrl);
    }

    return this._repository.create(user);
  }

  readById(resourceId: string) {
    return this._repository.findOne(resourceId);
  }

  async updateById(id: string, resource: UserRequestBody) {
    const imageFile = resource.files?.find((file) => file.fieldname === 'avatar');
    let newUrl;
    if (imageFile) {
      newUrl = await resize(imageFile);
    }

    return this._repository.update(id, {
      ...resource,
      avatarURL: newUrl,
    });
  }

  deleteById(resourceId: string) {
    return this._repository.delete(resourceId);
  }
}
