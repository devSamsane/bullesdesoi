import * as fs from 'fs';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
const util = require('util');
const crypto = require('crypto');

// Promisify fonctions
export const randomBytes = util.promisify(crypto.randomBytes);
export const signJWT = util.promisify(jwt.sign);

export class SecurityHelper {

  private static RSA_PRIVATE_KEY = fs.readFileSync('./server/config/sslcerts/key.pem');
  private static RSA_PUBLIC_KEY = fs.readFileSync('./server/config/sslcerts/cert.pem');
  public static TOKEN_EXPIRESIN = 1000;

  public static async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  public static async createToken(userId: string): Promise<any> {
    return signJWT({}, this.RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: this.TOKEN_EXPIRESIN,
      subject: userId
    });
  }

}
