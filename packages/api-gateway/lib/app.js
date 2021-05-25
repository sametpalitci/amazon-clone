require('dotenv').config({ path: '../../.env' });

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const mainRouter = require('../routes');

app.use('/api/v1/api-gateway', mainRouter);

app.listen(process.env.API_GATEWAY_PORT, () =>
  console.log(`PORT:` + process.env.API_GATEWAY_PORT)
);
