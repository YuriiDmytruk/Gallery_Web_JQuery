const express = require('express');
const bodyParser = require('body-parser');

let images = require('./data');
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  console.log('GET');
  res.send({ images: images });
});

app.post('/', (req, res) => {
  console.log('POST');
  images = [req.body.image, ...images];
  res.send({ images: images });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
