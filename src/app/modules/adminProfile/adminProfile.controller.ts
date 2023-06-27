import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from '../admin/admin.interface';
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AdminProfileService } from './adminProfile.service';

const updateProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const updateData = req.body;
    const result = await AdminProfileService.updateProfile(
      token as string,
      updateData
    );
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'my profile update successfully',
      data: result,
    });
  }
);

export const AdminProfileController = {
  updateProfile,
};
