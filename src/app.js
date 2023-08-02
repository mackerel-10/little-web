import express from 'express';
import dotenv from 'dotenv/config';

const app = express();

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host, () => {
  console.log(`🔗 ${port} Connected`);
});
