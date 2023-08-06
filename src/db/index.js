import mysql from 'mysql2/promise';

// MySQL
const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_USER_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
};

const db = mysql.createPool(options);
db.on('connection', () => {
  console.log('MySQL connected!\n');
});
db.on('error', (error) => {
  console.error('MySQL failed...\n', error);
});

export { db };
export * from './models';
