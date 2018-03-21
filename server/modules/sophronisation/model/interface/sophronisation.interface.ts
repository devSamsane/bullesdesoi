import { Types } from 'mongoose';

export interface Sophronisation {
  user: Types.ObjectId;
  seance: Types.ObjectId;
  description: string;
  intention: string;
  type: string[];
  name: string;
  created: Date;
  updated: Date;
}
