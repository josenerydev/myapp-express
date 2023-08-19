const { getDatabase } = require('./db');

function routes(app) {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/create-user', (req, res) => {
        const form = `
        <form action="/create" method="post">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name">
            
            <label for="age">Age:</label>
            <input type="number" id="age" name="age">
            
            <input type="submit" value="Create User">
        </form>
        `;
    
        res.send(form);
    });

    app.post('/create', async (req, res) => {
        try {
            const { name, age } = req.body;
            const knex = getDatabase();
            const result = await knex('users').insert({ name, age });
            res.json({ success: true, message: 'Data inserted!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error', error });
        }
    });
}

module.exports = routes;
