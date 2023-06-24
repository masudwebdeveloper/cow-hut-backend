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

export const AdminAuthRoutes = router;
