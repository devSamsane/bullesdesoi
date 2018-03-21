import { Types } from 'mongoose';

export interface Relaxation {
  user: Types.ObjectId;
  seance: Types.ObjectId;
  intitule: string;
  intention: string;
  consigne: string;
  created: Date;
  updated?: Date;
}
