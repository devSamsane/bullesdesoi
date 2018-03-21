import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';

import { Sophronisation as SophronisationInterface } from './interface/sophronisation.interface';
import { sophronisationSchema } from './schema/sophronisation.schema';

export interface SophronisationModel extends SophronisationInterface, Document {}
export interface SophronisationModelStatic extends Model<SophronisationModel> {}

export const Sophronisation = mongoose.model<
  SophronisationModel,
  SophronisationModelStatic
>('Sophronisation', sophronisationSchema);
