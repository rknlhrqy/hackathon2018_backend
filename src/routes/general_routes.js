const _ = require('lodash');
const mysqlDB = require('../db/mysql');

const sanityCheck = (data) => {
  if (_.isEmpty(data)) {
    console.log('HTTP POST /user Empty Data Received:');
    return false;
  } else if (!data.pointName || !data.latitude || !data.longitude) {
    console.log('HTTP POST /user Empty 2 Data Received:');
    return false;
  }
  return true;
};

module.exports = (app) => {
  app.get('/users', async (request, response) => {
    console.log('HTTP GET /users Received!');
    const data = await mysqlDB.readTable();
    console.log(JSON.stringify(data));
    response.send({data});
  });

  app.post('/user', async (request, response) => {
    let locData = _.pick(request.body, ['pointName', 'latitude', 'longitude']);
    if (!sanityCheck(locData)) {
      response.status(400).send({error: 'Data not valid!'});
    } else {
      console.log('HTTP POST /user Data Received:');
      console.log(locData);
      await mysqlDB.insertToTable(locData);
      response.send({locData});
    }
  });
};
