require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const FileUpload = require('express-fileupload');
const sequelize = require('./db');
const routers = require('./routers/index');
const errorHandling = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload({}));

app.use(express.static(path.resolve(__dirname, 'static')));

app.use('/api', routers);

app.use(errorHandling);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
