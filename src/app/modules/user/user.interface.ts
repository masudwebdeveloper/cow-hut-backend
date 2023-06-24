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
  budget: string;
  income: string;
};

export type IUserFilters = {
  searchTerm?: string;
  role?: string;
  name?: string;
  phoneNumber?: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
