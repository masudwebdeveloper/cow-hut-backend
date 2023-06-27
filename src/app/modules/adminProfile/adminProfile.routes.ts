import { Router } from 'express';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AdminProfileController } from './adminProfile.controller';

const router = Router();

router.patch(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminProfileController.updateProfile
);

export const AdminProfileRoutes = router;
