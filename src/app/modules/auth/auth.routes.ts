import { Router } from 'express';
import validateReqest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateReqest(AuthValidation.authZodSchema),
  AuthController.login
);

router.post(
  '/refesh_token',
  validateReqest(AuthValidation.refeshTokenZodSchema),
  AuthController.refeshToken
);

export const AuthRoutes = router;
