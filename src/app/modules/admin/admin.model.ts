/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import bcrypt, { compare } from 'bcrypt';
import config from '../../../config';

export const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin'],
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPasswrod: string
) {
  return await compare(givenPassword, savedPasswrod);
};

adminSchema.pre('save', async function (next) {
  const admin = this;
  try {
    const hashPassword = await bcrypt.hash(
      admin.password,
      Number(config.bcrypt_salt_round)
    );
    admin.password = hashPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
