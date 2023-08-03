import mysql from 'mysql2';

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_USER_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect();

db.on('connect', () => {
  console.log('MySQL connected!');
});
db.on('error', (error) => {
  console.error('MySQL failed...\n', error);
});

export default db;
