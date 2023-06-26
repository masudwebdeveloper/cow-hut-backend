/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { Secret } from 'jsonwebtoken';
import { Admin } from '../admin/admin.model';
import { IAdmin } from '../admin/admin.interface';

const myProfile = async (token: string): Promise<IUser | IAdmin | null> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(token, config.jwt.access as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'not right user');
  }

  const { id, role } = verifiedToken;

  const user = await User.findOne({ _id: id, role });

  const admin = await Admin.findOne({ _id: id, role });

  return user || admin;
};

const updateProfile = async (
  token: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(token, config.jwt.access as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'invalid token');
  }
  const { id, role } = verifiedToken;

  const isExist = await User.findOne({ _id: id, role });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate(
    { _id: id, role },
    updatedUserData,
    {
      new: true,
    }
  );

  return result;
};

export const MyProfileService = {
  myProfile,
  updateProfile,
};
