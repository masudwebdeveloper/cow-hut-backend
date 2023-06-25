import { Router } from 'express';
import validateReqest from '../../middleware/validateRequest';
import { CowValidation } from './cow.validation';
import { CowController } from './cow.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

router.post(
  '/',
  validateReqest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  CowController.getCows
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getCow
);

router.patch(
  '/:id',
  validateReqest(CowValidation.updateCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateCow
);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export const CowRoutes = router;
