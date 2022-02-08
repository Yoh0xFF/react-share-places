import { Schema, model } from 'mongoose';

import { reshapingOptions } from '../utils/mongoose-schema';

export interface Place {
  id: string;
  creator: string;

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
    creator: { type: String, required: true },

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
