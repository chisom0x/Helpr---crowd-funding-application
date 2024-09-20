import { createServer } from './app';
import mongoose from 'mongoose';

const DB = process.env.DB as string;

mongoose.connect(DB).then(() => {
  console.log('DB Connected');
});


const server = createServer();
const port = 5000;
server.listen(port, () => {
  console.log(`api running on ${port}`);
});