import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../utils/app-error'; 

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let token: string | undefined;

    const authHeader = req.headers?.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new AppError('Not logged in!', 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded as JwtPayload;
    } else {
      req.user = decoded; 
    }

    return next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
