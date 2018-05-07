import { Response, Request, NextFunction, Router } from 'express';

import { User, UserModel } from '../../modules/user/model/user.model';

import { UsersService } from '../../modules/user/services/users.service';
import { UserController } from '../../modules/user/controllers/users.controller';

import { SecurityHelper } from '../helpers/security.helper';


export class UserApi {

  public static exposeApi(router: Router) {
    router.post('/api/auth/signup/', (req: Request, res: Response, next: NextFunction) => {
      UserController.userSignup(req, res, next);
    });
    router.post('/api/auth/signin/', (req: Request, res: Response, next: NextFunction) => {
      UserController.userSignin(req, res, next);
    });
  }

}
