import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

// use cors
app.use(cors());

// app parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import globalErrorHandler from './app/middleware/globalErrorHandler';
import { Routes } from './app/routes';
import apiHandleNotFound from './app/middleware/apiHandleNotFound';

//set api router
app.use('/api/v1', Routes);

// global error handler
app.use(globalErrorHandler);
// //api not Found
app.use(apiHandleNotFound);

export default app;
