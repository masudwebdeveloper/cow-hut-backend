"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const cow_routes_1 = require("../modules/cow/cow.routes");
const order_routes_1 = require("../modules/order/order.routes");
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
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.Routes = router;
