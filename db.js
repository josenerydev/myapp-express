const Knex = require('knex');
const getDatabaseConfig = require('./awsConfig');

let knexInstance;

async function setupDatabase() {
    if (!knexInstance) {
        const config = await getDatabaseConfig();
        knexInstance = Knex(config);
    }
}

function getDatabase() {
    return knexInstance;
}

module.exports = { setupDatabase, getDatabase };
