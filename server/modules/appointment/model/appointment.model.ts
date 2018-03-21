import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';

import { Appointment as AppointmentInterface } from './interface/appointment.interface';
import { appointmentSchema } from './schema/appointment.schema';

export interface AppointmentModel extends AppointmentInterface, Document {}
export interface AppointmentModelStatic extends Model<AppointmentModel> {}

export const Appointment = mongoose.model<AppointmentModel, AppointmentModelStatic>('Appointment', appointmentSchema);
