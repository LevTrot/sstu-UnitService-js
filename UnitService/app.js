const express = require('express');
const app = express();

app.use(express.json());

const loggingMiddleware = require('./modules/log/logging');
app.use(loggingMiddleware);

const unitRoutes = require('./modules/unit/routes');
app.use('/unit', unitRoutes);

module.exports = app;
