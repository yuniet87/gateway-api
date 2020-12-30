import { Schema } from 'mongoose';

export const GatewaySchema = new Schema({
  serialNumber: String,
  hrName: String,
  ipAddress: String,
  devices: [Schema.Types.ObjectId],
});
