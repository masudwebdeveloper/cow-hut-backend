import { Router } from 'express';
import validateReqest from '../../middleware/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';

const router = Router();

router.post(
  '/',
  validateReqest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

router.get('/', OrderController.getOrders);

export const OrderRoutes = router;
