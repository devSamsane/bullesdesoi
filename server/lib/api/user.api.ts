import { Response, Request, NextFunction, Router } from 'express';
import { User, UserModel } from '../../modules/user/model/user.model';
import { UsersService } from '../../modules/user/services/users.service';
import { SecurityHelper } from '../helpers/security.helper';


export class UserApi {

  public static exposeApi(router: Router) {
    router.post('/api/auth/signup/', (req: Request, res: Response, Next: NextFunction) => {
      this.createUser(req, res);
    });
  }

  private static async createUser(req: Request, res: Response) {
    const reqUser: UserModel = req.body;

    this.createUserAndSession(req, res, reqUser)
      .catch(error => {
        res.status(500).json({
          message: `Erreur interne du server`,
          error: error
        });
      });
  }

  private static async createUserAndSession(req: Request, res: Response, userToStore: UserModel) {

    // Enregistrement du user en base
    const user: UserModel = await UsersService.signup(userToStore);

    const sessionToken: string = await SecurityHelper.createSessionToken(user.id.toString());


    // Renvoi de la réponse au client
    res.status(200).json({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      created: user.created,
      token: sessionToken,
      expiresIn: 1000
    });
  }
}
