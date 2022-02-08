import errorHandler from 'errorhandler';
import http from 'http';
import mongoose, { Schema } from 'mongoose';

import app from './app';

// Do not reject self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Get port from environment and store in Express.
const port = process.env.PORT || '8080';
app.set('port', parseInt(port, 10));

// Error Handler. Provides full stack - remove for production
app.use(errorHandler());

// Create and run the server
const server = http.createServer(app);

// Connect to the mongodb and start express server.
const mongodbUser = process.env.MONGODB_ATLAS_USER;
const mongodbPass = process.env.MONGODB_ATLAS_PASS;
const mongodbDatabase = 'share-places';
const mongodbUrl = `mongodb+srv://${mongodbUser}:${mongodbPass}@cluster0.ayq7c.mongodb.net/${mongodbDatabase}?retryWrites=true&w=majority`;

mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log('Mongoose connected successfully');

    server.listen(port);

    server.on('error', (error) => {
      console.log('Http server failed', error);
    });

    server.on('listening', () => {
      console.log(
        'App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      );

      console.log('Press CTRL-C to stop\n');
    });
  })
  .catch((error) => {
    console.log('Mongoose failed to connect to cluster', error);
  });
