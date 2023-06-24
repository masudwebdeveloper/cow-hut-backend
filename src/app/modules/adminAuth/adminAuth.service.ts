import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Admin } from '../admin/admin.model';
import { IAdminAuthData, IAdminAuthResponse } from './adminAuth.interface';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const adminAuthLogin = async (
  payload: IAdminAuthData
): Promise<IAdminAuthResponse> => {
  const { phoneNumber, password } = payload;
  const isAdminExist = await Admin.findOne({ phoneNumber });
  //check admin have or not
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin can not find');
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

export const AdminAuthService = {
  adminAuthLogin,
};
