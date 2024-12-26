import './loadEnv.js'; // This loads the dotenv configuration

import app from './app.js';

const port = process.env.WEBSERVER_PORT
  ? parseInt(process.env.WEBSERVER_PORT)
  : 5050;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
