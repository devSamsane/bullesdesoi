import * as mongoose from 'mongoose';
import * as chalk from 'chalk';

import { properties } from "../../config";
import { userSchema } from '../../modules/user/model/schema/user.schema';
import { User } from '../../modules/user/model/interface/user.interface';
import { UserModel } from '../../modules/user/model/user.model';
import { sophronisationSchema } from '../../modules/sophronisation/model/schema/sophronisation.schema';
import { SophronisationModel } from '../../modules/sophronisation/model/sophronisation.model';
import { SeanceModel } from '../../modules/seance/model/seance.model';
import { seanceSchema } from '../../modules/seance/model/schema/seance.schema';
import { RelaxationModel } from '../../modules/relaxation/model/relaxation.model';
import { relaxationSchema } from '../../modules/relaxation/model/schema/relaxation.schema';
import { AppointmentModel } from '../../modules/appointment/model/appointment.model';
import { appointmentSchema } from '../../modules/appointment/model/schema/appointment.schema';

// Configuration Promise de mongoose
require('mongoose').Promise = properties.config.db.promise;

export class MongooseService {

  // Définition de l'url MongoDB
  private uri: string = properties.config.db.uri;

  /**
   * Connection à la db
   * @returns {Promise<any>}
   * @memberof MongooseService
   */
  public connectDB(): Promise<any> {
    return new Promise((resolve, reject) => {
      const mongoOptions = { ...properties.config.db.options };
      mongoose.connect(this.uri, mongoOptions)
        .then(() => {
          // Activation du mode `debug` si nécessaire
          mongoose.set('debug', properties.config.db.debug);
          resolve(mongoose);
        })
        .catch(error => {
          console.error(chalk.red(`Echec de connexion à la db`));
          console.error(error);

          reject(error);
        });
    });
  }

  /**
   * Connexion aux modèles
   * @memberof MongooseService
   */
  public loadModels(): void {

    // Initialisation d'une connection à la db
    const connection: mongoose.Connection = mongoose.createConnection(this.uri);

    // Connexions aux models
    // Recencement de tous les models à faire ici
    const User: mongoose.Model<UserModel> = connection.model('User', userSchema);
    const Sophronisation: mongoose.Model<SophronisationModel> = connection.model('Sophronisation', sophronisationSchema);
    const Seance: mongoose.Model<SeanceModel> = connection.model('Seance', seanceSchema);
    const Relaxation: mongoose.Model<RelaxationModel> = connection.model('Relaxation', relaxationSchema);
    const Appointment: mongoose.Model<AppointmentModel> = connection.model('Appointment', appointmentSchema);

  }
}
