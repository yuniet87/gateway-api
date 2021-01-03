import { Schema } from 'mongoose';

export const GatewaySchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  hrName: String,
  ipAddress: {
    type: String,
    required: true,
  },
  devices: [Schema.Types.ObjectId],
});
