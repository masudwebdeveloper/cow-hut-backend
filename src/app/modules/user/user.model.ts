/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { role } from './user.constants';
import { IUser, UserModel } from './user.interface';
import { compare } from 'bcrypt';
import config from '../../../config';
import bcrypt from 'bcrypt';

export const userSchema = new Schema<IUser, UserModel>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: role,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    income: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPasswrod: string
) {
  return await compare(givenPassword, savedPasswrod);
};

userSchema.pre('save', async function (next) {
  const user = this;
  try {
    const hashPassword = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round)
    );
    user.password = hashPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

export const User = model<IUser, UserModel>('User', userSchema);
