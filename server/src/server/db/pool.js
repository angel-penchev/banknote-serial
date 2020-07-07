const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export default pool;
