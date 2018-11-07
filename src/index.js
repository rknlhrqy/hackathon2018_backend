
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const keys = require('./config/keys');
const backEndRoute = require('./routes/general_routes.js');

const app = express();

// mongoose.Promise = global.Promise;
// mongoose.connect(keys.mongoDbUri, { useNewUrlParser: true });

app.use(bodyParser.json());

backEndRoute(app);

/*
if (process.env.NODE_ENV === 'production') {
  // Express Framework will serve up production assets
  // like the main.js and main.css files.
  app.use(express.static('client/build'));

  // Express Framework will serve up the index.html file
  // if it does not recognize the route
  const path = require('path');
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT);
