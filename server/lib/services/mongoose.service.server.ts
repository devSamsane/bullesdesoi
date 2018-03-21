import * as mongoose from 'mongoose';
import * as chalk from 'chalk';

import { properties } from "../../config";
import { MongoClient, MongoCallback, MongoClientOptions } from 'mongodb';

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
}