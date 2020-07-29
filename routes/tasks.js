const { Router, request } = require('express');
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

router.get('/:projectId', async (request, response) => {
  const { projectId } = request.params;
  try {
    const res = await query('SELECT * FROM tasks where projectId = ?', [
      projectId
    ]);
    response.status(200).send(res);
  } catch (err) {
    console.log(err);
  }
});

router.post('/createProject', async (request, response) => {
  const { title, description } = request.body;

  try {
    await query('insert into projects (title, description) values (?, ?)', [
      title,
      description
    ]);
    response.status(200).send({ message: 'Project Created' });
  } catch (err) {
    console.log(err);
  }
});

router.post('/createTask', async (request, response) => {
  const { projectId, description } = request.body;
  console.log(request.body);
  try {
    await query('insert into tasks (projectId, description) values (?, ?)', [
      projectId,
      description
    ]);
    response.status(200).send({ message: 'Task Created' });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
