import { Document, Schema, Types, model } from 'mongoose';

import { reshapingOptions } from '../utils/mongoose-utils';
import { Place, PlaceDocument } from './place-model';

export interface User {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image: string;
  places: Types.Array<Types.ObjectId | string | PlaceDocument>;
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

export type UserDocument = User & Omit<Document, 'id'>;
export const UserModel = model<UserDocument>('User', userSchema);
