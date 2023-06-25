import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelper } from '../../helpers/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'you are not authorization'
        );
      }

      let verifiedUser = null;

      try {
        verifiedUser = jwtHelper.verifyToken(
          token,
          config.jwt.access as Secret
        );
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'invalid user');
      }

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser?.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
