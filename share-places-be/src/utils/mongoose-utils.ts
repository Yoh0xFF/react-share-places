import mongoose from 'mongoose';

export async function connectDatabase(): Promise<void> {
  const mongodbUser = process.env.MONGODB_ATLAS_USER;
  const mongodbPass = process.env.MONGODB_ATLAS_PASS;
  const mongodbDatabase = 'share-places';
  const mongodbUrl = `mongodb+srv://${mongodbUser}:${mongodbPass}@cluster0.ayq7c.mongodb.net/${mongodbDatabase}?retryWrites=true&w=majority`;

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
