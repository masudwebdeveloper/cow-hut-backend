import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { CowRoutes } from '../modules/cow/cow.routes';
import { OrderRoutes } from '../modules/order/order.routes';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const Routes = router;
