import * as express from 'express';

import { Middlewares } from './services/middlewares.service.server';
import { Logger } from './services/logger.service.server';

// const expressLogger = ;

export class App {
  public app: express.Application;

  constructor() {

    // Déclaration de l'instance de l'application express
    this.app = express();

    // Initialisation du logger
    this.app.use(new Logger().logExpress());

    // Déclaration de l'instance des middlewares
    this.configMiddlewares(this.app);

    // Déclaration de l'instance d'exposition des api
    this.api();
  }

  /**
   * Initialisation de l'instance de l'application
   * @static
   * @returns {App} instance de la class App
   * @memberof App
   */
  public static bootstrap(): App {
    return new App();
  }

  /**
   * Exposition des api à l'application
   * @private
   * @memberof App
   */
  private api() {

  }

  /**
   * Exposition des middlewares à l'application
   * @private
   * @param {express.Application} app 
   * @memberof App
   */
  private configMiddlewares(app: express.Application) {
    Middlewares.init(app);
  }
}