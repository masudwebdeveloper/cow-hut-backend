import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginData,
  ILoginResponse,
  IRefeshTokenResponse,
} from './auth.interface';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const login = async (payload: ILoginData): Promise<ILoginResponse> => {
  const { phoneNumber, password } = payload;

  const isUserExist = await User.findOne({ phoneNumber });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  if (
    isUserExist?.password &&
    !(await User.isPasswordMatch(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password doesn't match");
  }

  const { id, role } = isUserExist;

  const accessToken = jwtHelper.createToken(
    {
      id,
      role,
    },
    config.jwt.access as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  const refeshToken = jwtHelper.createToken(
    {
      id,
      role,
    },
    config.jwt.refesh as Secret,
    { expiresIn: config.jwt.refesh_expires_in }
  );

  return {
    accessToken,
    refeshToken,
  };
};

const refeshToken = async (token: string): Promise<IRefeshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(token, config.jwt.refesh as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refesh token');
  }

  const { id } = verifiedToken;

  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  const { id: userId, role } = isUserExist;

  const newAccessToken = jwtHelper.createToken(
    { id: userId, role },
    config.jwt.access as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  return { accessToken: newAccessToken };
};

export const AuthService = {
  login,
  refeshToken,
};
