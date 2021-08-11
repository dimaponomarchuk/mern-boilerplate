import shortUUID from 'short-uuid';
import cryptoPassword from '../common/crypto';

import Entity from '../common/entity';

export default class User extends Entity {
  private _name: string;

  private _surname: string;

  private _username: string;

  private _email: string;

  private _password: string;

  private _avatarURL?: string;

  private _permissionLevel: number;

  constructor(params: {
    id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    avatarURL?: string;
    permissionLevel: number;
  }) {
    super(params.id);

    this._name = params.name;
    this._surname = params.surname;
    this._username = params.username;
    this._email = params.email;
    this._password = params.password;
    this._avatarURL = params.avatarURL;
    this._permissionLevel = params.permissionLevel;
  }

  get name() {
    return this._name;
  }

  get surname() {
    return this._surname;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get permissionLevel() {
    return this._permissionLevel;
  }

  get avatarURL() {
    return this._avatarURL;
  }

  static create(params: {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
  }): User {
    return new User({
      id: shortUUID.generate(),
      name: params.name,
      surname: params.surname,
      email: params.email,
      username: params.username,
      permissionLevel: 1,
      password: cryptoPassword(params.password),
    });
  }

  setPermissionLevel(permissionLevel: number) {
    this._permissionLevel = permissionLevel;
    return true;
  }

  setPassword(password: string) {
    if (!process.env.SALT) throw new Error();
    this._password = cryptoPassword(password);
    return true;
  }

  validatePassword(password: string) {
    if (!process.env.SALT) throw new Error();
    const decoded = cryptoPassword(password);
    return decoded === this.password;
  }

  setAvatarURL(url: string) {
    this._avatarURL = url;
    return true;
  }
}
