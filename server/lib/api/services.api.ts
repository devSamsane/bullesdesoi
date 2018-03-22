import { Request, Response, NextFunction, Router } from 'express';

export class ServicesApi {

  public static routesApi(router: Router) {
    // Test route backend ok
    router.get('/', (req: Request, res: Response) => {
      new ServicesApi().testBackend(req, res);
    });
  }

  private testBackend(req: Request, res: Response) {
    res.json({
      message: `Backend bullesdesoi opérationel`
    });
  }
}
