import mongoose from 'mongoose';

export async function connectDatabase(): Promise<void> {
  const user = process.env.MONGODB_USER;
  const pass = process.env.MONGODB_PASS;
  const domain = process.env.MONGODB_DOMAIN;
  const name = process.env.MONGODB_NAME;
  const mongodbUrl = `mongodb+srv://${user}:${pass}@${domain}/${name}?retryWrites=true&w=majority`;

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
