import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';

import { User as UserInterface } from './interface/user.interface';
import { userSchema } from './schema/user.schema';

export interface UserModel extends UserInterface, Document {}
export interface UserModelStatic extends Model<UserModel> {}

export const User = mongoose.model<UserModel, UserModelStatic>('User', userSchema);
