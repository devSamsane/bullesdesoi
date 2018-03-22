import * as _ from 'lodash';
import * as fs from 'fs';
import * as expressWinston from 'express-winston';
import * as winston from 'winston';

import { properties } from '../../config';
import { Properties } from '../../interfaces/properties.interface';

export class Logger {
  public logger: expressWinston.LoggerOptions;
  public loggerExpress: any;

  /**
   * Configuration du fichier de log
   * @private
   * @memberof Logger
   */
  private setupFileLogger() {
    // Clone des properties
    const _properties: Properties = _.clone(properties);

    // Déclaration du noeud de configuration log des properties
    const loggerProperties = _properties.config.log.fileLogger;

    // Vérification que le noeud est renseigné
    if (!_.has(_properties, 'config.log.fileLogger.directoryPath')|| !_.has(_properties, 'config.log.fileLogger.filename')) {
      console.warn(`Noeud de configuration logger non défini dans les properties`);
      return null;
    }

    // Paramétrage du répertoire et du fichier de log
    const loggerPath = `${loggerProperties.directoryPath}/${loggerProperties.filename}`;

    // Instanciation du fichier de log
    if (!fs.openSync(loggerPath, 'a+')) {
      throw new Error(`Erreur à l'instanciation du fichier de log`);
    }

    return {
      level: 'debug',
      colorize: false,
      filename: loggerPath,
      timestamp: true,
      maxsize: loggerProperties.maxsize ? loggerProperties.maxsize : 10485760,
      maxFiles: loggerProperties.maxFiles ? loggerProperties.maxFiles : 2,
      json: (_.has(loggerProperties, 'json')) ? loggerProperties.json : true,
      eol: '/n',
      tailable: true,
      showLevel: true,
      humanReadableUnhandledException: true
    };
  }

  /**
   * Configuration du logger
   * @returns {*} 
   * @memberof Logger
   */
  public logExpress() {
    if (this.loggerExpress) {
      return this.loggerExpress;
    }

    // Définition des options
    const fileLoggerTransport = this.setupFileLogger();

    this.loggerExpress = expressWinston.logger({
      transports: [
        new winston.transports.Console({
          level: 'info',
          json: false,
          colorize: true
        }),
        new winston.transports.File({
          level: fileLoggerTransport.level,
          colorize: fileLoggerTransport.colorize,
          filename: fileLoggerTransport.filename,
          timestamp: fileLoggerTransport.maxsize,
          maxFiles: fileLoggerTransport.maxFiles,
          json: fileLoggerTransport.json,
          eol: fileLoggerTransport.eol,
          tailable: fileLoggerTransport.tailable,
          showLevel: fileLoggerTransport.showLevel,
          humanReadableUnhandledException: fileLoggerTransport.humanReadableUnhandledException
        })
      ],
      expressFormat: true,
      colorize: true
    });

    return this.loggerExpress;
  }
}
