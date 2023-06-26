/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder, startSession } from 'mongoose';
import { ICow, IFilters } from './cow.interface';
import { Cow } from './cow.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interface/paginationOption';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { cowSearchableFields } from './cow.constants';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  if (!cow.label) {
    cow.label = 'for sale';
  }
  let newCowData = null;

  const session = await startSession();

  try {
    session.startTransaction();

    const newCow = await Cow.create([cow], { session });

    if (!newCow.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'create a cow failed');
    }

    newCowData = newCow[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newCowData) {
    newCowData = await Cow.findOne({ _id: newCowData._id }).populate('seller');
  }

  return newCowData;
};

const getCows = async (
  filters: IFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filterData } = filters;
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice || maxPrice) {
    const priceCondition: any = {};

    if (minPrice) {
      priceCondition.$gte = minPrice;
    }
    if (maxPrice) {
      priceCondition.$lte = maxPrice;
    }

    andCondition.push({
      price: priceCondition,
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Cow.find(whereCondition)
    .populate('seller')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const { ...updateData } = payload;
  const result = await Cow.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id).populate('seller');
  return result;
};

export const CowService = {
  createCow,
  getCows,
  getCow,
  updateCow,
  deleteCow,
};
