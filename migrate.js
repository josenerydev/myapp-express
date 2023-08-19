require('dotenv').config();
const Knex = require('knex');
const getDatabaseConfig = require('./awsConfig');

(async function() {
    const config = await getDatabaseConfig();
    const knex = Knex(config);

    // Run migrations
    try {
        await knex.migrate.latest();
        console.log('Migration completed');
    } catch (error) {
        console.error('Migration failed:', error);
    }

    process.exit();
})();
