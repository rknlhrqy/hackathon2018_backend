
const express = require('express');
const bodyParser = require('body-parser');
const backEndRoute = require('./routes/general_routes.js');
require('./db/mysql');

const app = express();

app.use(bodyParser.json());

// Fix CORS error
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
