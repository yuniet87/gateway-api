import { Schema } from 'mongoose';
import * as beautifyUnique from 'mongoose-beautiful-unique-validation';

export const GatewaySchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  hrName: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  devicesIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Device',
    },
  ],
});

GatewaySchema.plugin(beautifyUnique, {
  defaultMessage: 'Two gateways cannot share the same Serial Number ({VALUE})',
});
