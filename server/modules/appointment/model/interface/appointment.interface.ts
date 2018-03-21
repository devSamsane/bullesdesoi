import { Types } from 'mongoose';

export interface Appointment {
  startDateTime: Date;
  endDateTime: Date;
  isConfirmed: boolean;
  subject?: string;
  user: Types.ObjectId;
}
