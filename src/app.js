import express from 'express';
import dotenv from 'dotenv/config';
import db from './db';

const app = express();

app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🔗 ${port} Connected`);
});
