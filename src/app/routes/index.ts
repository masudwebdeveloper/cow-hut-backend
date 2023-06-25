import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { CowRoutes } from '../modules/cow/cow.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { AdminAuthRoutes } from '../modules/adminAuth/adminAuth.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { MyProfileRoutes } from '../modules/myProfile/myProfile.routes';

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
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/admins',
    route: AdminAuthRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/my_profile',
    route: MyProfileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const Routes = router;
