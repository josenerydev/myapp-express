async function getDatabaseConfig() {
    let secrets;

    if (process.env.USE_AWS_SECRETS === 'true') {
        secrets = await getSecrets();
    } else {
        secrets = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT || 5432
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
