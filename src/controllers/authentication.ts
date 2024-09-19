import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import createSendToken from '../utils/jwt-helper';
import AppError from '../utils/app-error';
import userService from '../services/user';
import { successResponse } from '../utils/response';

export default class Authentication {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    const { accountType, name, email, password } = req.body;

    if (!accountType)
      return next(new AppError('please specify an account type', 400));
    if (!name) return next(new AppError('please enter a name', 400));
    if (!email)
      return next(new AppError('please enter your email address', 400));
    if (!password) return next(new AppError('please enter a password', 400));

    try {
      if (await userService.userByEmail(email))
        return next(new AppError('email already exists!', 400));

      const user = await userService.createUser(
        accountType,
        name,
        email,
        password
      );
      return createSendToken(user, 200, res);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email)
      return next(new AppError('please enter your email address', 400));
    if (!password) return next(new AppError('please enter a password', 400));

    try {
      const user = await userService.userByEmail(email);

      let userPass = !user ? 'no_user' : (user.password as string);
      const pass = await bcrypt.compare(password, userPass);

      if (user && pass) return createSendToken(user, 200, res);
      return next(new AppError('incorrect email or password!', 400));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.cookie('jwt', 'logged out', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
      return successResponse(res, null);
    } catch (error) {
      return next(error);
    }
  }
}
