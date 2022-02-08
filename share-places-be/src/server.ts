import errorHandler from 'errorhandler';
import http from 'http';

import app from './app';
import { connectDatabase } from './utils/mongoose-utils';

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
connectDatabase()
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
