const express = require('express');
import resourceController from './controllers/resources.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/resources', resourceController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
