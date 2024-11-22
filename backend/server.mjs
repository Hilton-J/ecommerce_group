import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.mjs'
import { errorHandler, notFound } from './middleware/errorMiddelware.mjs';
import connectDB from './config/db.mjs';
dotenv.config();


const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});

//Br3jpetjUTw2qVEE lhmajola