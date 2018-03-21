import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';

import { Relaxation as RelaxationInterface } from './interface/relaxation.interface';
import { relaxationSchema } from './schema/relaxation.schema';

export interface RelaxationModel extends RelaxationInterface, Document {}
export interface RelaxationModelStatic extends Model<RelaxationModel> {}

export const Relaxation = mongoose.model<
  RelaxationModel,
  RelaxationModelStatic
>('Relaxation', relaxationSchema);
