import { Schema, model } from 'mongoose';

export interface SerializedUser {
  _id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  avatarURL?: string;
  permissionLevel: number;
}

const UserSchema = new Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarURL: String,
    permissionLevel: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

// UserSchema.loadClass(User);

export default model<SerializedUser>('User', UserSchema);
