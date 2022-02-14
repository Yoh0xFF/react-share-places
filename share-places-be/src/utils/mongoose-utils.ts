import mongoose from 'mongoose';

export async function connectDatabase(): Promise<void> {
  const mongodbUrl = process.env.MONGODB_URL;

  await mongoose.connect(mongodbUrl);
}

export const reshapingOptions = {
  // include .id (it's a virtual)
  virtuals: true,
  getters: true,

  // exclude .__v
  versionKey: false,

  // exclude ._id
  transform: function (doc: any, ret: any) {
    delete ret._id;
    return ret;
  },
};
