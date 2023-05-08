require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authRoute = require('./routes/auth')
const jobRoute = require('./routes/jobs')

// security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('rate-limiter')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1', authRoute)
app.use('/api/v1/jobs', jobRoute)
app.use('/',  (req, res)=>{res.send('its working')})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// app.use(rateLimiter())
app.use(helmet())
app.use(cors())
app.use(xss())

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
