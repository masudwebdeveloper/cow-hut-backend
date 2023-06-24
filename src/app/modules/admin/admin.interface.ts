/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { Name } from '../../../interface/common';

export type IAdmin = {
  password: string;
  role: 'admin';
  name: Name;
  phoneNumber: string;
  address: string;
};

export type AdminModel = {
  isPasswordMatch(
    givenPassword: string,
    savedPasswrod: string
  ): Promise<boolean>;
} & Model<IAdmin>;
