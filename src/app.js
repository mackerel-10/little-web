import express from 'express';
import dotenv from 'dotenv/config';
import router from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🔗 ${port} Connected`);
});
