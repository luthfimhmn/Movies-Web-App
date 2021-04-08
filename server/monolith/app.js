const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const PORT = process.env.PORT || 3000;

app.use(router);
app.use(errorHandler);

app.listen(PORT , () => console.log(`This app is running on http://localhost:${PORT}`))