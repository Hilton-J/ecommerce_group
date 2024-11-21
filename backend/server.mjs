import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.mjs'
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use('api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});