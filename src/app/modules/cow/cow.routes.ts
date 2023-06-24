import { Router } from 'express';
import validateReqest from '../../middleware/validateRequest';
import { CowValidation } from './cow.validation';
import { CowController } from './cow.controller';

const router = Router();

router.post(
  '/',
  validateReqest(CowValidation.createCowZodSchema),
  CowController.createCow
);

router.get('/', CowController.getCows);

router.get('/:id', CowController.getCow);

router.patch(
  '/:id',
  validateReqest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.delete('/:id', CowController.deleteCow);

export const CowRoutes = router;
