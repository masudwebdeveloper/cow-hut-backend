import { Router } from 'express';
import { MyProfileController } from './myProfile.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

router.get('/', MyProfileController.myProfile);

router.patch(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  MyProfileController.updateProfile
);

export const MyProfileRoutes = router;
