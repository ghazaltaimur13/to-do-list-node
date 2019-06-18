const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');


// Set up the express app
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.options('*', cors());
require('./routes')(app);
app.get('/', (req, res) => res.status(200).send({
	message: 'Welcome to the To Do List Backend.',
}));
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;