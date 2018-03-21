import * as _ from 'lodash';
import * as expressWinston from 'express-winston';

import { properties } from "../../config";
import { Properties } from '../../interfaces/properties.interface';

export class Logger {
  public logger: expressWinston.LoggerOptions;
  public loggerExpress: expressWinston.LoggerOptionsWithWinstonInstance;

  /**
   * Configuration du fichier de log
   */
  private setupFileLogger() {

  }
}