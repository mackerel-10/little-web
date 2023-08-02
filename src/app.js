import express from 'express';
import dotenv from 'dotenv/config';

const app = express();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🔗 ${port} Connected`);
});
