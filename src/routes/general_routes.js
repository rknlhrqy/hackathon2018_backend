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

  app.get('/', (request, response) => {
    response.redirect('/users');
  });

  app.get('/users/:count?/:count2?', async (request, response) => {
    const { count, count2 } = request.params;
    try {
      const data = await mysqlDB.readTable('users', count, count2);
      response.send({data});
    } catch(error) {
      response.status(400).send({error: 'Error!'});
    }
  });

  app.get('/accelerations/:count?/:count2?', async (request, response) => {
    const { count, count2 } = request.params;
    try {
      const data = await mysqlDB.readTable('acceleration (oct)', count, count2);
      response.send({data});
    } catch(error) {
      response.status(400).send({error: 'Error!'});
    }
  });

  app.get('/acls/:count?/:count2?', async (request, response) => {
    const { count, count2 } = request.params;
    try {
      const data = await mysqlDB.readTable('acl (oct)', count, count2);
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
