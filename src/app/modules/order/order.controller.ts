import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder } from './order.interface';
import httpStatus from 'http-status';
import { OrderService } from './order.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationFields';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create order is successfully',
    data: result,
  });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrderService.getOrders(paginationOptions);
  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'orders is retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const OrderController = {
  createOrder,
  getOrders,
};
