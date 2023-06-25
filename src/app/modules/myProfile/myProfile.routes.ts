import { Router } from 'express';
import { MyProfileController } from './myProfile.controller';


const router = Router();

router.get(
  '/',
  MyProfileController.myProfile
);

export const MyProfileRoutes = router;
