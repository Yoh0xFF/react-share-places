import { Document, Schema, Types, model } from 'mongoose';

import { reshapingOptions } from '../utils/mongoose-utils';
import { User } from './user-model';

export interface Place extends Document {
  id: string;
  creator: Types.ObjectId | string | User;

  imageUrl: string;
  title: string;
  description: string;

  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

const placeSchema = new Schema<Place>(
  {
    creator: { type: Types.ObjectId, required: true, ref: 'User' },

    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },

    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  {
    toJSON: reshapingOptions,
    toObject: reshapingOptions,
  }
);

export const PlaceModel = model<Place>('Place', placeSchema);
