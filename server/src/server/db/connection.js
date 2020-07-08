import pool from './pool';
const isProduction = process.env.NODE_ENV === 'production';


if (!isProduction) {
  pool.on('connect', () => {
    console.log('Successfully connected to the database...');
  });
}


/**
 * Create Banknotes Table
 */
const createBanknotesTable = () => {
  const banknotesCreateQuery = `
    CREATE TABLE IF NOT EXISTS banknotes (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(100) NOT NULL,
      original_name VARCHAR(100) NOT NULL,
      created_on VARCHAR(100) NOT NULL,
      serial VARCHAR(20)
    )`;

  pool.query(banknotesCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Banknotes Table
 */
const dropBanknotesTable = () => {
  const banknotesDropQuery = 'DROP TABLE IF EXISTS banknotes';
  pool.query(banknotesDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createBanknotesTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropBanknotesTable();
};

if (!isProduction) {
  pool.on('remove', () => {
    console.log('Database disconnected... Exiting...');
    process.exit(0);
  });
}

export {
  createAllTables,
  dropAllTables,
};

require('make-runnable');
