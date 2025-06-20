const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

const client = new Client({
  host: 'database',
  user: 'postgres',
  password: 'example',
  database: 'testdb',
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

app.get('/', async (req, res) => {
  const result = await client.query('SELECT NOW()');
  res.send(`Hello from backend! Server time: ${result.rows[0].now}`);
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
