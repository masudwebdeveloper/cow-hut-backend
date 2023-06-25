import { Router } from 'express';
import validateReqest from '../../middleware/validateRequest';
import { AdminAuthValidation } from './adminAuth.validation';
import { AdminAuthController } from './adminAuth.controller';

const router = Router();

router.post(
  '/login',
  validateReqest(AdminAuthValidation.adminAuthZodScema),
  AdminAuthController.adminAuthLogin
);

router.post(
  '/refesh_token',
  validateReqest(AdminAuthValidation.refeshTokenadminAuthZodScema),
  AdminAuthController.refeshTokenAdminAuth
);

export const AdminAuthRoutes = router;
