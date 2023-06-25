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

export const MyProfileService = {
  myProfile,
};
