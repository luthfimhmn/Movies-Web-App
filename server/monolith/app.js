const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { connectMongodb } = require('./config/mongodb');
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(router);
app.use(errorHandler);


connectMongodb((connected) => {
  if(connected) {
    console.log('Success connect to mongodb')
  }
  else console.log('error!')
})

app.listen(PORT , () => console.log(`This app is running on http://localhost:${PORT}`))