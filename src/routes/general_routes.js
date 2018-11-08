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
    try {
      const data = await mysqlDB.readTable('users');
      response.send({data});
    } catch(error) {
      response.status(400).send({error: 'Error!'});
    }
  });

  app.get('/accelerations', async (request, response) => {
    try {
      const data = await mysqlDB.readTable('acceleration (oct)');
      response.send({data});
    } catch(error) {
      response.status(400).send({error: 'Error!'});
    }
  });

  app.get('/acls', async (request, response) => {
    try {
      const data = await mysqlDB.readTable('acl (oct)');
      response.send({data});
    } catch(error) {
      response.status(400).send({error: 'Error!'});
    }
  });

  app.post('/user', async (request, response) => {
    let locData = _.pick(request.body, ['pointName', 'latitude', 'longitude']);
    if (!sanityCheck(locData)) {
      response.status(400).send({error: 'Data not valid!'});
    } else {
      try {
        const data = await mysqlDB.insertToTable(locData);
        response.send({data});
      } catch (error) {
        response.status(400).send({error: 'error!'});
      }
    }
  });
};
