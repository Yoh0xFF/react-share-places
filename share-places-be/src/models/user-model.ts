import { Document, Schema, Types, model } from 'mongoose';

import { reshapingOptions } from '../utils/mongoose-utils';
import { Place } from './place-model';

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  places: Types.Array<Types.ObjectId | string | Place>;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    places: [{ type: Types.ObjectId, required: true, ref: 'Place' }],
  },
  {
    toJSON: reshapingOptions,
    toObject: reshapingOptions,
  }
);

export const UserModel = model<User>('User', userSchema);
