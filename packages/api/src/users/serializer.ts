import Serializer from '../common/serializer';
import User from './entity';
import { SerializedUser } from './schema';

export default class UserSerializer implements Serializer<User, SerializedUser> {
  serialize(user: User): SerializedUser {
    const result: SerializedUser = {
      _id: user.id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      password: user.password,
      permissionLevel: user.permissionLevel,
    };

    if (user.avatarURL) {
      result.avatarURL = user.avatarURL;
    }

    return result;
  }

  deserialize(user: SerializedUser): User {
    return new User({
      id: user._id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      password: user.password,
      avatarURL: user.avatarURL ? user.avatarURL : undefined,
      permissionLevel: user.permissionLevel,
    });
  }
}
