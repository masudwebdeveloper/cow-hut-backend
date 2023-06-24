import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';
import pick from '../../../shared/pick';
import { cowFilterableFields } from './cow.constants';
import { paginationFields } from '../../../constants/paginationFields';
import { Request, Response } from 'express';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.createCow(cowData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create a cow successfully',
    data: result,
  });
});

const getCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get cows retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.getCow(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get cow retrieved successfully',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await CowService.updateCow(id, updateData);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'cow update is successfully',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.deleteCow(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'cow deleted is successfully',
    data: result,
  });
});

export const CowController = {
  createCow,
  getCows,
  getCow,
  updateCow,
  deleteCow,
};
