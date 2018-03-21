import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';

import { Seance as SeanceInterface } from './interface/seance.interface';
import { seanceSchema } from './schema/seance.schema';

export interface SeanceModel extends SeanceInterface, Document {}
export interface SeanceModelStatic extends Model<SeanceModel> {}

export const Seance = mongoose.model<
  SeanceModel,
  SeanceModelStatic
>('Seance', seanceSchema);
