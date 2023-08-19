'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
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
