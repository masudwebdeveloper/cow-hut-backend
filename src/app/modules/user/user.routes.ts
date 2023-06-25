import { Router } from 'express';
import validateReqest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

router.post(
  '/signup',
  validateReqest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getUsers);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getUser);

router.patch(
  '/:id',
  validateReqest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
