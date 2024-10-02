const express = require('express');
const fileUpload = require('express-fileupload');

const productRouter = require('./Routers/ProductRouter');
const app = express();
app.use(express.json());

app.use(fileUpload({
    createParentPath: true
  }));
app.use('/api/v1/products', productRouter );


module.exports = app;