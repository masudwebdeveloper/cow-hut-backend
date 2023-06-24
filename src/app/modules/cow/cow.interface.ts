import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

type Location =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

type Breed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

type Label = 'for sale' | 'sold out';

type Category = 'Dairy' | 'Beef' | 'DualPurpose';

export type ICow = {
  name: string;
  age: string;
  price: string;
  location: Location;
  breed: Breed;
  weight: string;
  label?: Label;
  category: Category;
  seller: Types.ObjectId | IUser;
};

export type IFilters = {
  searchTerm?: string;
  minPrice?: string;
  maxPrice?: string;
  name?: string;
  age?: string;
  price?: string;
  location?: string;
  breed?: string;
  weight?: string;
  label?: string;
  category?: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
