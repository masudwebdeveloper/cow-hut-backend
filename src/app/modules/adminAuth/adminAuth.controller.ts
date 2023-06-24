import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AdminAuthService } from './adminAuth.service';
import config from '../../../config';
import { IAdminAuthResponse } from './adminAuth.interface';

const adminAuthLogin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...adminAuthData } = req.body;
    const result = await AdminAuthService.adminAuthLogin(adminAuthData);

    const { refeshToken,...others } = result;

    const options = {
      secure: config.node_env === 'production',
      httpOnly: true,
    };
    res.cookie('refeshToken', refeshToken, options);

    sendResponse<IAdminAuthResponse | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'admin login successfully',
      data: others,
    });
  }
);

export const AdminAuthController = {
  adminAuthLogin,
};
