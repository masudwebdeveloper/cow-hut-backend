import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { MyProfileService } from './myProfile.service';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import { IAdmin } from '../admin/admin.interface';

const myProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'unauthorized');
    }

    const result = await MyProfileService.myProfile(token);

    sendResponse<IUser | IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user retrieved successfully',
      data: result,
    });
  }
);

const updateProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const updateData = req.body;
    const result = await MyProfileService.updateProfile(
      token as string,
      updateData
    );
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'my profile update successfully',
      data: result,
    });
  }
);

export const MyProfileController = {
  myProfile,
  updateProfile,
};
