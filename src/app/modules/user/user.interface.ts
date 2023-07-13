/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type Name = {
  firstName: string;
  lastName: string;
};

type Role = 'seller' | 'buyer';

export type IUser = {
  password: string;
  role: Role;
  name: Name;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type IUserFilters = {
  searchTerm?: string;
  role?: string;
  name?: string;
  phoneNumber?: string;
};

export type UserModel = {
  isPasswordMatch(
    givenPassword: string,
    savedPasswrod: string
  ): Promise<boolean>;
} & Model<IUser>;
