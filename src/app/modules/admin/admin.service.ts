import config from '../../../config';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (admin: IAdmin): Promise<IAdmin> => {
  //checking has a password
  if (!admin.password) {
    admin.password = config.admin_pass as string;
  }

  admin.role = 'admin';

  const result = await Admin.init()
    .then(() => Admin.create(admin))
    .catch(error => {
      throw error;
    });

  return result;
};

export const AdminService = {
  createAdmin,
};
