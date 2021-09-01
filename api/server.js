const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { AuthRouter } = require('./controllers/authentication');
const { ExpenseRouter } = require('./controllers/expense');

const server = express();
server.use(
  cors({
    origin: 'https://localhost:3000/',
  })
);
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(AuthRouter);
server.use(ExpenseRouter);

(async () => {
  await mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  server.listen(process.env.PORT);
})();
