const { Segments, errors } = require('celebrate');
const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();
app.use(express.json());
app.use(routes);
// celebrate error handler
app.use(errors());

app.listen(3000, () => {
  console.log('Server running at localhost:3000');
});
