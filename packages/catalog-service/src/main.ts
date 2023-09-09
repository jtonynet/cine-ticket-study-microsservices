import express from 'express';
import sequelize from './models/db';

const app = express();

app.get('/api', (_, res) => {
  res.send({ message: 'Welcome to catalog-service!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

async function syncDB() {
  await sequelize.sync();
  console.log('Models synchronized with the database');
}

syncDB();
