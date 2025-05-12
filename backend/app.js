const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');

//connection to MongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,


}).then(() => console.log("DB Connection successful"))
.catch(err => console.log("DB Connection failed", err));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json("limit = 5mb"));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser);
app.use(cors());


//middleware for error handling
app.use(errorHandler);


//port configuration
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});