import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as helmet from 'helmet';

import { properties } from '../../config/index';

export class Middlewares {

  public static init(app: express.Application) {

    // Initialisation de la configuration `locals` expressJS
    new Middlewares().initLocalsVariables(app);

    // Initialisation des middlewares express
    new Middlewares().initExpressMiddlewares(app);

    // Initialisation des headers Helmet
    new Middlewares().initHelmetMiddleware(app);
  }

  /**
   * Configuration `locals` de l'application expressJS
   * @param {app} express.Application instance de l'application
   */
  private initLocalsVariables(app: express.Application) {
    app.locals.title = properties.app.title;
    app.locals.description = properties.app.description;
    app.locals.keywords = properties.app.keywords;
    app.locals.domain = properties.server.domain;
    app.locals.env = properties.env;

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.host = `${req.protocol}://${req.hostname}`;
      res.locals.url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
      next();
    });
  }

  /**
   * Configuration des middlewares expressJS
   * @param {app} express.Application instance de l'application
   */
  private initExpressMiddlewares(app: express.Application) {

    // Middleware: COMPRESSION
    app.use(compression({
      filter: (req: Request, res: Response) => {
        return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type').toString());
      },
      level: 9
    }));

    // Middleware: BODY-PARSER
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    // Middleware: METHOD-OVERRIDE
    app.use(methodOverride());

  }

  /**
   * Configuration du middleware Helmet
   * @param {app} express.Application instance de l'application
   */
  private initHelmetMiddleware(app: express.Application) {
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff())
    app.use(helmet.ieNoOpen())
    app.use(helmet.hsts({
      maxAge: properties.config.helmet.hsts.expiration,
      includeSubdomains: properties.config.helmet.hsts.includeSubdomains,
      force: properties.config.helmet.hsts.force
    }));
    app.use(helmet.hidePoweredBy());
  }

}