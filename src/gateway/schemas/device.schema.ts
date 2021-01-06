import { Schema } from 'mongoose';

export const DeviceSchema = new Schema({
  vendor: {
    type: String,
    required: true,
    maxlength: 1,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
});
