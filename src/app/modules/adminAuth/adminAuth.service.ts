import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Admin } from '../admin/admin.model';
import {
  IAdminAuthData,
  IAdminAuthResponse,
  IRefeshTokenResponse,
} from './adminAuth.interface';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const adminAuthLogin = async (
  payload: IAdminAuthData
): Promise<IAdminAuthResponse> => {
  const { phoneNumber, password } = payload;
  const isAdminExist = await Admin.findOne({ phoneNumber }).select('password');
  //check admin have or not
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "admin can't found !");
  }

  if (
    isAdminExist?.password &&
    !(await Admin.isPasswordMatch(password, isAdminExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password doesn't match");
  }

  const { id, role } = isAdminExist;

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

const refeshTokenAdminAuth = async (
  token: string
): Promise<IRefeshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(token, config.jwt.refesh as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }

  const { id } = verifiedToken;

  const isAdminExist = await Admin.findOne({ _id: id });

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin does not exist');
  }

  const { id: adminId, role } = isAdminExist;

  const newAccessToken = jwtHelper.createToken(
    {
      id: adminId,
      role,
    },
    config.jwt.access as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  return { accessToken: newAccessToken };
};

export const AdminAuthService = {
  adminAuthLogin,
  refeshTokenAdminAuth,
};
