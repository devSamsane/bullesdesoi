import { User, UserModel } from '../model/user.model';
import { SecurityHelper } from '../../../lib/helpers/security.helper';

export class UsersService {

  static storeUser(userData: UserModel) {
    const user: UserModel = new User(userData);
    return user.save();
  }

  static async signup(userToStore: UserModel) {
    userToStore.provider = 'local';
    userToStore.displayName = `${userToStore.firstName}, ${userToStore.lastName}`;

    if (userToStore.password) {
      // TODO: Supprimer la console
      console.log('password: ', userToStore.password);
      userToStore.password = await SecurityHelper.hashPassword(userToStore.password);
    }

    const user: UserModel = await this.storeUser(userToStore);

    user.password = '';
    return Promise.resolve(user);
  }
}
