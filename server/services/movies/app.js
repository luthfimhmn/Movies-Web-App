const express = require('express');
const { connectMongodb } = require('./config/mongodb');
const app = express();
const PORT = process.env.PORT || 4001; // 3000 before
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');


app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(router);
app.use(errorHandler);

connectMongodb((connected) => {
  if(connected) console.log('Success connect to mongodb');
  else console.log('error !');
})

app.listen(PORT, () => {
  console.log(`This app is listening to ${PORT}`);
})