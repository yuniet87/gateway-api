import { Schema } from 'mongoose';

export const DeviceSchema = new Schema({
  uid: {
    type: Number,
    required: true,
  },
  vendor: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
});
