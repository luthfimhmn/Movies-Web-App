const express = require('express');
const { connectMongodb } = require('./config/mongodb');
const app = express();
const PORT = 3002

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectMongodb((connected)=> {
  if(connected) console.log('Success connect to mongodb');
  else console.log('error !');
})


app.listen(PORT , () => console.log(`This series services running on ${PORT}`))