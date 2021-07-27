import crypto from 'crypto';

import Entity from '../common/entity';

export interface IUser {
  username: string;
  email: string;
  password: string;
  permissionLevel: number;
}

export default class User extends Entity {
  // private _userModel: IUser;
  private _username: string;

  private _email: string;

  private _password: string;

  private _permissionLevel: number;

  constructor(params: IUser) {
    super();

    // this._userModel = userModel;
    this._username = params.username;
    this._email = params.email;
    this._password = params.password;
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

  setPermissionLevel(permissionLevel: number) {
    this._permissionLevel = permissionLevel;
    return true;
  }

  setPassword(password: string) {
    if (!process.env.SALT) throw new Error();
    this._password = crypto
      .pbkdf2Sync(password, process.env.SALT, 1000, 64, 'sha512')
      .toString('hex');
    return true;
  }

  validatePassword(password: string) {
    if (!process.env.SALT) throw new Error();
    const decoded = crypto
      .pbkdf2Sync(password, process.env.SALT, 1000, 64, 'sha512')
      .toString('hex');
    return decoded === this.password;
  }
}
