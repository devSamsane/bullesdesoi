import { Response, Request, NextFunction, Router } from 'express';

import { User, UserModel } from '../model/user.model';
import { UsersService } from '../services/users.service';

import { SecurityHelper } from '../../../lib/helpers/security.helper';
import * as argon2 from 'argon2';


export class UserController {

  public static async userSignup(req: Request, res: Response, next: NextFunction) {
    const reqUser: UserModel = req.body;

    try {
      this.createUserAndAffectToken(res, reqUser);
    } catch (error) {
      res.status(500).json({
        message: `Erreur interne`,
        error: error
      });
    }
  }

  public static async userSignin(req: Request, res: Response, next: NextFunction) {
    const credentials: { email: string, password: string } = req.body;

    try {
      this.findUserAndCheckPassword(res, next, credentials);
    } catch (error) {
      res.status(403).json({
        message: 'Echec authentification'
      });
    }
  }

  private static async createUserAndAffectToken(res: Response, newUser: UserModel) {

    try {
      // Création du nouvel utilsateur
      const user: UserModel = await UsersService.createUser(newUser);
      // Création du user token
      const token: string = await SecurityHelper.createToken(user.id.toString());

      // Renvoi de la réponse
      res
        .status(200)
        .json({
          user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            roles: user.roles,
            created: user.created,
          },
          bdsToken: token,
          bdsTokenExpiresIn: SecurityHelper.TOKEN_EXPIRESIN
        });
    } catch (error) {
      return res.status(500).json((error.message));
    }
  }

  private static async findUserAndCheckPassword(res: Response, next: NextFunction, credentials: { email: string, password: string }) {

    const user = await UsersService.findUserByEmail(credentials.email.toString());

    if (!user) {
      // next(new Error('Utilisateur ou mot de passe invalide 1'));
      return res.status(403).json({
        message: 'Utilisateur ou mot de passe invalide'
      });
    }

    return this.buildSigninResponse(credentials, user, res);

  }

  private static async buildSigninResponse(
    credentials: { email: string, password: string },
    user: UserModel,
    res: Response,
    ) {

    const isPasswordValid: boolean = await argon2.verify(user.password, credentials.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: 'Utilisateur ou mot de passe invalide'
      });
    }

    const token: string = await SecurityHelper.createToken(user.id.toString());

    if (!token) {
      return res.status(500).json({
        message: 'Une erreur interne est survenue, merci de réessayer'
      });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        roles: user.roles,
        created: user.created,
      },
      bdsToken: token,
      bdsTokenExpiresIn: SecurityHelper.TOKEN_EXPIRESIN
    });

  }

  private static async trySignin(
    credentials: { email: string, password: string },
    user: UserModel,
    res: Response
  ) {
    const isPasswordValid: boolean = await argon2.verify(user.password, credentials.password);

    if (!isPasswordValid) {
      return res.status(403).json({
       message: 'Utilisateur ou mot de passe invalide 3'
     });
    }

    return SecurityHelper.createToken(user.id.toString());
  }


}
