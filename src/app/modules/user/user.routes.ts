import { Router } from 'express';
import validateReqest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = Router();

router.post(
  '/signup',
  validateReqest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUser);

router.patch(
  '/:id',
  validateReqest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
