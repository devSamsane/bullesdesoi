import { Types } from 'mongoose';

export interface Seance {
  user: Types.ObjectId;
  intention: string;
  rang: number;
  created: Date;
  updated?: Date;
  relaxations?: Types.ObjectId[];
  sophronisations?: Types.ObjectId[];
}
