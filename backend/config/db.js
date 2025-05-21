// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log('🟢 Connecté à PostgreSQL'))
    .catch((err) => console.error('🔴 Erreur connexion DB:', err));

module.exports = pool;
