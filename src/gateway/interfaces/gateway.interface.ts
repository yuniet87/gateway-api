import { Document } from 'mongoose';
import { Device } from './device.interface';

export interface Gateway extends Document {
  readonly serialNumber: string;
  readonly hrName: string;
  readonly ipAddress: string;
  readonly devices: Device[];
}
