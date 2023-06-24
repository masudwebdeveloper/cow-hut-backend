import { Router } from 'express';
import validateReqest from '../../middleware/validateRequest';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';

const router = Router();

router.post(
  '/create_admin',
  validateReqest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

export const AdminRoutes = router;
