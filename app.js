import { sequelize } from "./db.js";
import express from "express";
import { User, Words } from "./models/models.js";
import cors from 'cors';
import { router } from './routes/index.js';
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Обработка ошибок
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connect to database');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();