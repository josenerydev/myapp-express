const getSecrets = require('./secrets'); 

async function getDatabaseConfig() {
    let secrets;

    if (process.env.USE_AWS_SECRETS === 'true') {
        const awsSecrets = await getSecrets();
        console.log(awsSecrets);
        
        secrets = {
            host: awsSecrets.DB_HOST,
            user: awsSecrets.DB_USER,
            password: awsSecrets.DB_PASSWORD,
            database: awsSecrets.DB_NAME,
            port: parseInt(awsSecrets.DB_PORT, 10) || 5432
        };
    } else {
        secrets = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT, 10) || 5432
        };
    }

    return {
        client: 'pg',
        connection: secrets,
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        }
    };
}

module.exports = getDatabaseConfig;
