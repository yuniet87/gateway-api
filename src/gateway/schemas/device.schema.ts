import { Schema } from 'mongoose';

export const DeviceSchema = new Schema({
  uid: Number,
  vendor: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isOnline: Boolean,
});
