const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: "songs",
    host: "localhost",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Totes connected to the DB!');
});

pool.on('error', (error) => {
    console.log(`DANGER! ${error}`);
});

module.exports = pool;