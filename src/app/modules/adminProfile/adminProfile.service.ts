/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { IAdmin } from '../admin/admin.interface';
import ApiError from '../../../errors/ApiError';
import { Admin } from '../admin/admin.model';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';

const updateProfile = async (
  token: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(token, config.jwt.access as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'invalid token');
  }
  const { id, role } = verifiedToken;

  const isAdminExist = await Admin.findOne({ _id: id, role });

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  const { name, password, ...userData } = payload;
  let hashPassword = null;
  const updatedAdminData: Partial<IAdmin> = { ...userData };
  if (password) {
    hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_round)
    );
    (updatedAdminData as any).password = hashPassword;
  }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate(
    { _id: id, role },
    updatedAdminData,
    {
      new: true,
    }
  );

  return result;
};

export const AdminProfileService = {
  updateProfile,
};
