import { Document, Schema, Types, model } from 'mongoose';

import { reshapingOptions } from '../utils/mongoose-utils';
import { User, UserDocument } from './user-model';

export interface Place {
  id: Types.ObjectId;
  creator: Types.ObjectId | string | UserDocument;

  image: string;
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

    image: { type: String, required: true },
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

export type PlaceDocument = Place & Omit<Document, 'id'>;
export const PlaceModel = model<PlaceDocument>('Place', placeSchema);
