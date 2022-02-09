import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { reshapingOptions } from '../utils/mongoose-utils';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  places: number;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    places: { type: Number, required: true },
  },
  {
    toJSON: reshapingOptions,
    toObject: reshapingOptions,
  }
);
userSchema.plugin(uniqueValidator);

export const UserModel = model<User>('User', userSchema);
