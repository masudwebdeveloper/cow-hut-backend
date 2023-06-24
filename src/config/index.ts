import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  uri: process.env.URI,
  node_env: process.env.NODE_ENV,
  use_pass: process.env.USER_PASSWORD,
};
