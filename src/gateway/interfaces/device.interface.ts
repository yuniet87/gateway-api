import { Document } from 'mongoose';

export interface Device extends Document {
  readonly uid: number;
  readonly vendor: string;
  readonly createdDate: Date;
  readonly isOnline: boolean;
}
