import { Document } from 'mongoose';

export interface Gateway extends Document {
  readonly serialNumber: string;
  readonly hrName: string;
  readonly ipAddress: string;
  readonly devices: any;
}
