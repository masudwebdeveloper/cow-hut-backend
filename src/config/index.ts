import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  uri: process.env.URI,
  node_env: process.env.NODE_ENV,
  use_pass: process.env.USER_PASSWORD,
  admin_pass: process.env.ADDMIN_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt: {
    access: process.env.ACCESS_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refesh: process.env.REFESH_SECRET,
    refesh_expires_in: process.env.REFESH_EXPIRES_IN,
  },
};
