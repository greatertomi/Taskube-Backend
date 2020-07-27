const { Router } = require('express');
const db = require('../db');
const util = require('util');
const query = util.promisify(db.query).bind(db);

db.getConnection((err) => {
  if (err) throw err;
  console.log('MySQL is connected...');
});

const router = Router();

router.get('/', async (request, response) => {
  try {
    const res = await query('SELECT * FROM projects');
    response.status(200).send(res);
  } catch (err) {
    console.log(err);
  }
});

router.post('/createProject', (request, response) => {
  console.log(request.body);
  response.status(200).send({ message: 'Thanks' });
});

module.exports = router;
