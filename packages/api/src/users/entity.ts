import shortUUID from 'short-uuid';
import cryptoPassword from '../common/crypto';

import Entity from '../common/entity';

export default class User extends Entity {
  private _username: string;

  private _email: string;

  private _password: string;

  private _avatarURL?: string;

  private _permissionLevel: number;

  constructor(params: {
    id: string;
    username: string;
    email: string;
    password: string;
    avatarURL?: string;
    permissionLevel: number;
  }) {
    super(params.id);

    this._username = params.username;
    this._email = params.email;
    this._password = params.password;
    this._avatarURL = params.avatarURL;
    this._permissionLevel = params.permissionLevel;
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

  static create(params: { email: string; username: string; password: string }): User {
    return new User({
      id: shortUUID.generate(),
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
