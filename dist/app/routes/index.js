"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const cow_routes_1 = require("../modules/cow/cow.routes");
const order_routes_1 = require("../modules/order/order.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const adminAuth_routes_1 = require("../modules/adminAuth/adminAuth.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const myProfile_routes_1 = require("../modules/myProfile/myProfile.routes");
const adminProfile_routes_1 = require("../modules/adminProfile/adminProfile.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/cows',
        route: cow_routes_1.CowRoutes,
    },
    {
        path: '/orders',
        route: order_routes_1.OrderRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/admin',
        route: adminAuth_routes_1.AdminAuthRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/my_profile',
        route: myProfile_routes_1.MyProfileRoutes,
    },
    {
        path: '/myProfile',
        route: adminProfile_routes_1.AdminProfileRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.Routes = router;
