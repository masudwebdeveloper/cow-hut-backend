import { Router } from 'express';
import validateReqest from '../../middleware/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

router.post(
  '/',
  validateReqest(OrderValidation.createOrderZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.createOrder
);

router.get('/', OrderController.getOrders);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderController.getOrder
);

export const OrderRoutes = router;
