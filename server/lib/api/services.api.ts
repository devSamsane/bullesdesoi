import { Request, Response, NextFunction, Router } from 'express';
import * as rp from 'request-promise';
import { properties } from '../../config';

export class ServicesApi {
         public static routesApi(router: Router) {
           // Route Recaptcha
           router.get(
             '/api/recaptcha',
             (req: Request, res: Response, next: NextFunction) => {
               new ServicesApi().verifyRecaptchaController(
                 req,
                 res,
                 next
               );
             }
           );

           // Test route backend ok
           router.get('/', (req: Request, res: Response) => {
             new ServicesApi().testBackend(req, res);
           });
         }

         private testBackend(req: Request, res: Response) {
           res.json({ message: `Backend bullesdesoi opérationel` });
         }

  private verifyRecaptchaController(req: Request, res: Response, next: NextFunction) {
    const options = {
      method: 'POST',
      uri: 'https://www.google.com/recaptcha/api/siteverify',
      qs: {
        secret: properties.config.recaptcha.secret,
        response: req.query.token
      },
      json: true
    };
    rp(options)
      .then(response => res.json(response))
      .catch(() => {});
  }
}
