import { User, UserModel } from '../model/user.model';
import { SecurityHelper } from '../../../lib/helpers/security.helper';

export class UsersService {

  static storeUser(userData: UserModel) {
    const user: UserModel = new User(userData);
    return user.save();
  }


  /**
   * Méthode de création du user en base
   * @name signup
   * @static
   * @param {UserModel} newUser user à sauvegarder
   * @returns {UserModel} user user sauvegardé
   * @memberof UsersService
   */
  static async createUser(newUser: UserModel) {
    newUser.provider = 'local';
    newUser.displayName = `${newUser.firstName} ${newUser.lastName}`;

    // Hashage du password
    if (newUser.password) {
      newUser.password = await SecurityHelper.hashPassword(newUser.password);
    }

    // Sauvegarde du user en base
    const user: UserModel = await this.storeUser(newUser);

    // Suppression du password des informations retournees
    user.password = '';

    // Renvoi du user
    return Promise.resolve(user);
  }

  /**
   * Méthode de recherche d'un user par son email
   * @name findUserByEmail
   * @static
   * @param {string} email email du user
   * @returns user ou null
   * @memberof UsersService
   */
  static async findUserByEmail(email: string) {
    return User.findOne({ email: String(email) }).exec();
  }
}
