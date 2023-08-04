import mysql from 'mysql2';
import { createClient } from 'redis';

const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER_NAME,
  password: process.env.MYSQL_USER_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
};

let db;
(async () => {
  db = mysql.createPool(options);

  db.on('connect', () => {
    console.log('MySQL connected\n');
  });
  db.on('error', (error) => {
    console.error('MySQL failed...\n', error);
  });
})();

// Redis
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

(async () => {
  redisClient.on('connect', () => {
    console.log('Redis connected!');
  });
  redisClient.on('error', (error) => {
    console.error('Redis Client Error', error);
  });

  await redisClient.connect();
})();

export default db;
