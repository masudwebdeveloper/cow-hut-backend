'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const app = (0, express_1.default)();
// use cors
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// app parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const globalErrorHandler_1 = __importDefault(
  require('./app/middleware/globalErrorHandler')
);
const routes_1 = require('./app/routes');
const apiHandleNotFound_1 = __importDefault(
  require('./app/middleware/apiHandleNotFound')
);
//set api router
app.use('/api/v1', routes_1.Routes);
// global error handler
app.use(globalErrorHandler_1.default);
// //api not Found
app.use(apiHandleNotFound_1.default);
exports.default = app;
