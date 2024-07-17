const express = require('express'); // importing a CommonJS module
const morgan = require('morgan'); // third-party middleware, needs npm install morgan

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// Global middleware - applies to every request
server.use(express.json()); // built-in middleware, no need to npm install
server.use(morgan('combined'));
// server.use(gatekeeper); // custom middleware

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? `${req.name}` : '';

  res.send(`
    <h2>Hubs API</h2>
    <p>Welcome to the Hubs API</p>
  `);
});

server.post('/cars', addDoors, addMirrors, (req, res) => {
  console.log("req.car", req.car);
  res.status(200).json(req.car);
});

function addMirrors(req, res, next) {

  req.car.doors.mirrors = "cool mirrors";

  next();
}

function addDoors(req, res, next) {
  let car = req.body;

  car.doors = {};

  req.car = car;

  next();
}

// server.use('*', (req, res) => {
//   // catch all 404 errors middleware
//   res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
// });

function gatekeeper(req, res, next) {
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(401).json({ you: "can not pass!" });
  } else {
    next();
  }
  // return 401 when the seconds on the clock are divisable by 3
  // read seconds
  // if seconds are multiple of 3, return 401
  // if not, call next() 
}

module.exports = server;
