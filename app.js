const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); 

const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json())

app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((result) => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log(`server is running at http://localhost:${PORT}`)
  })
  .catch((err) => {
    console.log(err);
  });