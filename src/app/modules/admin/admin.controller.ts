import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { IAdmin } from './admin.interface';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AdminService } from './admin.service';

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const adminData: IAdmin = req.body;
    const result = await AdminService.createAdmin(adminData);

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'admin create successfully',
      data: result,
    });
  }
);

export const AdminController = {
  createAdmin,
};
