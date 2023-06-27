import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import config from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import { ILoginResponse, IRefeshTokenResponse } from './auth.interface';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;

    const result = await AuthService.login(loginData);

    const { refeshToken, ...others } = result;

    const options = {
      secure: config.node_env === 'production',
      httpOnly: true,
    };

    res.cookie('refeshToken', refeshToken, options);

    sendResponse<ILoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user login successfully',
      data: others,
    });
  }
);

const refeshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refeshToken } = req.cookies;

    const result = await AuthService.refeshToken(refeshToken);

    const options = {
      secure: config.node_env === 'production',
      httpOnly: true,
    };

    res.cookie('refeshToken', refeshToken, options);

    sendResponse<IRefeshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user login in successfully',
      data: result,
    });
  }
);

export const AuthController = {
  login,
  refeshToken,
};
