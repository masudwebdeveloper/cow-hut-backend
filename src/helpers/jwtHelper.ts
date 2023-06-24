import { Secret, sign } from 'jsonwebtoken';

const createToken = (
  payload: object,
  secret: Secret,
  options: object
): string => {
  return sign(payload, secret, options);
};

export const jwtHelper = {
  createToken,
};
