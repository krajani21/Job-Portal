const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');

//connection to MongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(() => console.log("DB Connection successful"))
.catch(err => console.log("DB Connection failed", err));



//port configuration
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});