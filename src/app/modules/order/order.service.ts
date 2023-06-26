import { startSession, ClientSession } from 'mongoose';
import { IOrder } from './order.interface';
import { User } from '../user/user.model';
import { Cow } from '../cow/cow.model';
import ApiError from '../../../errors/ApiError';
import { Order } from './order.model';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interface/paginationOption';
import { IGenericResponse } from '../../../interface/common';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const { cow, buyer } = payload;
  const orderCow = await Cow.findById(cow);
  if (orderCow) {
    if (orderCow.label === 'sold out') {
      throw new ApiError(400, 'This cow is already sold out');
    }
  }
  let orderData = null;
  const session: ClientSession = await startSession();
  try {
    session.startTransaction();

    // Get the buyer and cow documents within the transaction
    const buyerData = await User.findById(buyer);
    const cowData = await Cow.findById(cow);

    //check this cow already sold out
    if (cowData?.label === 'sold out') {
      throw new ApiError(400, 'This cow is already sold out');
    }

    const totalBudget = Number(buyerData?.budget);
    const totalPrice = Number(cowData?.price);

    //check buyer budget
    if (totalBudget < totalPrice) {
      throw new Error(
        'Insufficient funds. Please add more money to your account.'
      );
    }
    if (cowData) {
      await Cow.findByIdAndUpdate(
        cowData._id,
        { label: 'sold out' },
        { new: true }
      );
    }
    const remainingMoney = totalBudget - totalPrice;

    if (buyerData) {
      await User.findByIdAndUpdate(
        buyerData._id,
        { budget: remainingMoney.toString() },
        { new: true }
      );
    }

    const seller = await User.findById(cowData?.seller).session(session);
    let totalIncome = Number(seller?.income);
    totalIncome += totalPrice;
    if (seller) {
      await User.findByIdAndUpdate(
        seller._id,
        {
          income: totalIncome.toString(),
        },
        { new: true }
      );
    }

    const order = await Order.create([payload], { session });

    orderData = order[0];

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (!orderData) {
    throw new ApiError(500, 'Failed to create order.');
  } else {
    orderData = await Order.findById(orderData._id)
      .populate('cow')
      .populate('buyer');
  }

  return orderData;
};

const getOrders = async (
  paginationOptions: IPaginationOptions,
  token: string
): Promise<IGenericResponse<IOrder[]>> => {
  const { page, limit, sortBy } =
    paginationHelper.calculatePagination(paginationOptions);
  const skip = (page - 1) * limit;

  const verifiedToken = jwtHelper.verifyToken(
    token,
    config.jwt.access as Secret
  );

  if (!verifiedToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'invalid token');
  }

  const { id, role } = verifiedToken;
  let cow = null;
  if (role === 'seller') {
    cow = await Cow.find({ seller: id });
  }
  const cowId = cow?.map(item => item._id);

  const findCondition =
    role === 'admin' ? {} : role === 'buyer' ? { buyer: id } : { cow: cowId };

  const result = await Order.find(findCondition)
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .populate('buyer')
    .sort(sortBy)
    .skip(skip)
    .limit(limit);
  const total = result.length;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findOne({ _id: id })
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .populate('buyer');
  return result;
};

export const OrderService = {
  createOrder,
  getOrders,
  getOrder,
};
