import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { breed, category, label, location } from './cow.constants';

const cowSchema = new Schema<ICow, CowModel>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    enum: location,
    required: true,
  },
  breed: {
    type: String,
    enum: breed,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    enum: label,
  },
  category: {
    type: String,
    enum: category,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
