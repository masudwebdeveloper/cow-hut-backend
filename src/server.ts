/* eslint-disable no-console */
import { connect } from 'mongoose';
import config from './config';
import app from './app';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});
let server: Server;
async function dbConected() {
  try {
    await connect(config.uri as string).then(() => {
      console.log('🛢️ Database is Connected Successfully');
      server = app.listen(config.port, () => {
        console.log(`Cowhut server litening on port ${config.port}`);
      });
    });
  } catch (error) {
    console.error('Mongoose connected error: ', error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
dbConected();

process.on('SIGTERM', () => {
  console.log('sigterm is received');
  if (server) {
    server.close();
  }
});
