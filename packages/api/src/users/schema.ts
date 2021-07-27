import { Schema, model } from 'mongoose';

import { IUser } from './entity';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
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

export default model<IUser>('User', UserSchema);
