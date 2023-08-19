require('dotenv').config();
const express = require('express');
const getSecrets = require('./secrets');
const { setupDatabase } = require('./db');
const routes = require('./routes');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

getSecrets().then(async secrets => {
    await setupDatabase();
    app.use(express.json());
    routes(app);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}).catch(error => {
    console.error("Failed to start application:", error);
});

app.use(bodyParser.urlencoded({ extended: true }));