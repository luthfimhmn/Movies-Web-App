const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorHandler)


app.listen( 3001, () => console.log(`This app is running on port: 3001`))