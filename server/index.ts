import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose'
const cors = require('cors')

import router from './router'

dotenv.config({
  path: '.env'
});

const PORT = process.env.PORT || 3001;
const DB_URI = process.env.DB_URI || ''
const app = express();

app.use(cors())
app.use(express.json())
app.use(router)

app.use('*', (req, res) => res.send('Error, page does not exist'))

app.listen(PORT, () => {
  mongoose.connect(DB_URI);

  console.log('Connected to mongo db');
  console.log(`Server is running on port: ${PORT}`);
});