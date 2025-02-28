require('events').EventEmitter.defaultMaxListeners = 40;

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require('./db/connect');
const routes=require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection
connectDB('Sea_Guardian');


app.use('/api',routes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

